import mongoose from 'mongoose';
import ProblemSchema from '../src/database/ProblemSchema';
import DataLogSchema from '../src/database/DataLogSchema';
import axios from 'axios';

const mongoDbUrl = process.env.MONGO_DB || 'mongodb://localhost:27017/parsons';
const apiUrl = process.env.API_URL || 'https://api.parsons.hiru.dev/';

const solveUrl = apiUrl + 'solve';
const args = process.argv.slice(2);
console.log('Args', args);

async function main() {
  await mongoose.connect(mongoDbUrl, { useNewUrlParser: true });
  const output = {};

  const ids =
    args[0] === 'all' ? (await DataLogSchema.find({ result: { $exists: false } }, '_id')).map((r) => r._id) : args;

  console.log('Ids to inspect: ', ids);
  for (let id of ids) {
    console.log('===');
    console.log('Inspecting', id.toString());
    const datalog = await DataLogSchema.findById(id);
    const problem = await ProblemSchema.findById(datalog.blockState.initialProblem);
    if (datalog.result) {
      console.log('Already exists, skipping...');
      continue;
    }
    const response = await axios({
      url: solveUrl,
      method: 'POST',
      data: {
        solution: datalog.blockState.solution,
        blocks: datalog.blockState.blocks,
        initialProblem: datalog.blockState.initialProblem,
      },
    });
    const results = response.data;
    const totalTests = problem.problem.tests.length;
    const passedTets = Array.isArray(results) ? results.filter(({ result }) => result === 'correct').length : 0;
    console.log(passedTets, '/', totalTests);
    const res = `${passedTets}/${totalTests}`;
    output[id.toString()] = res;

    await DataLogSchema.updateOne({ _id: id }, { $set: { result: res } });
  }
  console.log(output);
}

main();
