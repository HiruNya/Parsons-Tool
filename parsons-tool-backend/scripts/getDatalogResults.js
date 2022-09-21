import mongoose from 'mongoose';
import ProblemSchema from '../src/database/ProblemSchema';
import DataLogSchema from '../src/database/DataLogSchema';
import UserSchema from '../src/database/UserSchema';
import axios from 'axios';

const mongoDbUrl = process.env.MONGO_DB || 'mongodb://localhost:27017/parsons';
//const apiUrl = process.env.API_URL || 'https://api.parsons.hiru.dev/';
const apiUrl = 'http://localhostL:3001/';

const solveUrl = apiUrl + 'solve';
const args = process.argv.slice(2);
console.log('Args', args);

async function main() {
  await mongoose.connect(mongoDbUrl, { useNewUrlParser: true });
  const output = {};

  const ids = args[0] === 'all' ? (await DataLogSchema.find({})).map((log) => log._id) : args;

  console.log('Ids to inspect: ', ids);
  for (let id of ids) {
    console.log('===');
    console.log('Inspecting', id.toString());
    const datalog = await DataLogSchema.findById(id);
    const problem = await ProblemSchema.findById(datalog.blockState.initialProblem);
    const user = await UserSchema.findById(datalog.userId);
    if (datalog.problemName) {
      console.log('name already exists, skipping...');
    } else {
      let problemName = '';
      problem.name.charAt(problem.name.length - 2) === '-'
        ? (problemName = problem.name.slice(0, -2))
        : (problemName = problem.name);
      await DataLogSchema.updateOne({ _id: id }, { $set: { problemName: problemName } });
    }

    if (datalog.totalTime) {
      console.log('totalTime already exists, skipping...');
    } else {
      const end = new Date(datalog.timestamp);
      const start = new Date(datalog.dataEvents[0].timestamp);

      const timeSeconds = (end - start) / 1000;
      const timeMin = timeSeconds / 60;
      let timeElapsedMin = timeMin.toFixed(3);
      let timeElapsedSec = timeSeconds.toFixed(3);

      const totalTime = { min: timeElapsedMin, sec: timeElapsedSec };
      console.log(totalTime);

      await DataLogSchema.updateOne({ _id: id }, { $set: { totalTime: totalTime } });
      console.log(totalTime);
    }

    if (datalog.result) {
      console.log('result Already exists, skipping...');
    } else {
      console.log('Waiting for execution request');
      const response = await axios({
        url: solveUrl,
        method: 'POST',
        data: {
          solution: datalog.blockState.solution,
          blocks: datalog.blockState.blocks,
          initialProblem: datalog.blockState.initialProblem,
        },
      });

      // Get and Set the number of tests passed as result
      const results = response.data;
      const totalTests = problem.problem.tests.length;
      const passedTests = Array.isArray(results) ? results.filter(({ result }) => result === 'correct').length : 0;
      console.log(passedTests, '/', totalTests);
      const res = `${passedTests}/${totalTests}`;
      output[id.toString()] = res;

      await DataLogSchema.updateOne(
        { _id: id },
        { $set: { result: res, totalTests: totalTests, passedTests: passedTests } },
      );
    }

    if (datalog.group) {
      console.log('Group already appended, skipping...');
    } else {
      // Get and set the control group
      const group = user.experimentGroup;

      await DataLogSchema.updateOne({ _id: id }, { $set: { group: group } });
      console.log('Group:', group);
    }

    if (datalog.eventDistribution) {
      console.log('EventDistribution already added, skipping...');
    } else {
      const dataEvents = [...datalog.dataEvents];
      const eventNumber = dataEvents.length;
      let moveEvents = 0,
        inputEvents = 0,
        submissionEvents = 0,
        executionEvents = 0;

      console.log(moveEvents, inputEvents, submissionEvents, executionEvents);

      dataEvents.forEach((event) => {
        switch (event.eventType) {
          case 'BLOCK_DRAG':
            moveEvents++;
            break;
          case 'INPUT':
            inputEvents++;
            break;
          case 'SUBMISSION':
            submissionEvents++;
            break;
          case 'EXECUTION':
            executionEvents++;
            break;
          default:
            console.log('Expression default');
        }
      });

      const eventDistribution = {
        numEvents: eventNumber,
        numMoved: moveEvents,
        numInputs: inputEvents,
        numSubmission: submissionEvents,
        numExecution: executionEvents,
      };

      await DataLogSchema.updateOne({ _id: id }, { $set: { eventDistribution: eventDistribution } });

      console.log(eventDistribution);
    }
  }
}

main();
