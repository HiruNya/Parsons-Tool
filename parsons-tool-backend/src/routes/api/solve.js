import express from 'express';
import axios from 'axios';

import DataLog from '../../database/DataLogSchema';
import ProblemSchema from '../../database/ProblemSchema';

const jobeUrl = process.env.JOBE_URL || 'http://localhost:4000';

const router = express.Router();

// POST request for Code Execution
// Expects: a JSON object in the body which contains the code to be evaluated
// Returns: A JSON object with the status of the different tests executed

router.post('/', async (req, res) => {
  const solution = req.body.solution;
  const blocks = req.body.blocks;
  for (let val in [solution, blocks]) {
    if (val === undefined) {
      return res.status(401);
    }
  }
  const solutionBlocks = solution.map((sId) => blocks[sId]);
  if (solutionBlocks.indexOf(undefined) !== -1) {
    return res.status(401);
  }
  const problem = await ProblemSchema.findById(req.body.initialProblem);
  const language = problem.language === 'Python' ? 'python3' : problem.language;
  const tests = problem.problem.tests;
  const testRunnerScript = testRunnerGenerator(language)(tests);
  const expectedOutput = tests.map(({ outputs }) => outputs.filter((v, i) => i % 2 === 0).join('\n'));
  const code = solutionBlocks.map(blockToLine).join('\n') + '\n' + testRunnerScript;
  console.log('[solve.js]> code>', code);
  console.log('[solve.js]> expected>', expectedOutput);
  const { error, result } = await executeOnJobe(code, { language });
  const errorMsg = (error && `Error: Status code ${error} received from Jobe`) || result.cmpinfo;
  if (errorMsg) {
    console.log('[solve.js]> errorMsg>', errorMsg);
    return res.status(200).json(errorMsg);
  }
  const actual = result.stdout.trimEnd('\n').split('\n$$$\n');
  console.log('[solve.js]> actual>', actual);
  const testResult = expectedOutput.map((v, i) => ({
    result: v === actual[i] ? 'correct' : 'incorrect',
    actual: stripNone(actual[i]),
    test: tests[i],
  }));
  console.log('[solve.js]> results>', testResult);
  return res.status(200).json(testResult);
});

// POST request for data logging submission
// Expects: a JSON object in the body conforming to DataLog model
// Returns: 201 Created if successful, 500 Internal Server Error otherwise with error
router.post('/submit', async (req, res) => {
  const { result, error } = await createDataLogRecord(req.body);
  if (result) {
    res.status(201).header('location', `/solve/submission/${result._id}`).send();
  } else {
    console.log('[solve.js]>', error);
    res.status(500).json(error).send();
  }
});

// Validates the fields needed are present and returns with an error message or the created record
const createDataLogRecord = async (obj) => {
  let err = '';
  try {
    if (obj.userId === undefined || obj.userId === null) {
      err = 'Invalid or Missing userId';
    } else if (obj.initialProblem === undefined || obj.initialProblem === null) {
      err = 'Invalid or Missing initialProblem';
    } else if (obj.blockState === undefined || obj.blockState === null) {
      err = 'Invalid or Missing blockState';
    } else if (obj.dataEvents === undefined || obj.dataEvents === null || obj.dataEvents.length < 1) {
      err = 'Invalid or Missing dataEvents';
    }
    if (err !== '') {
      return { result: false, error: err };
    }

    const newDataLog = new DataLog(obj);
    await newDataLog.save();
    return { result: newDataLog, error: '' };
  } catch (error) {
    return { result: false, error: error };
  }
};

const executeOnJobe = (sourceCode, { language }) =>
  axios({
    url: jobeUrl + '/jobe/index.php/restapi/runs',
    method: 'POST',
    data: {
      run_spec: {
        language_id: language.toLowerCase() || 'python3',
        sourcecode: sourceCode,
      },
    },
  }).then((resp) => {
    if (resp.status < 200 && resp.status >= 300) {
      return { error: resp.status };
    }
    return { result: resp.data };
  });

const blockToLine = ({ text, fadedIndices, currentInputs, indentation }) => {
  for (let i = fadedIndices.length - 1; i >= 0; i--) {
    const index = fadedIndices[i];
    const input = currentInputs[i];
    text = text.slice(0, index) + input + text.slice(index, text.length);
  }
  text = text.trimStart(' ');
  text = ' '.repeat(2 * indentation) + text;
  return text;
};

const stripNone = (str) => {
  if (!str) {
    return '';
  }
  return str.startsWith('None') ? str.substring('None'.length).trim() : str;
};

const testRunnerGenerator = (language) => {
  switch (language) {
    case 'C':
      return (tests) => {
        const testRunners = tests.map(
          ({ inputs, outputs }) =>
            inputs.slice(1).join('\n') +
            `\nprintf("%d", ${inputs[0]});\nprintf("\\n");\n` +
            outputs.filter((v, i) => i % 2 === 1).join('\n'),
        );
        return '#include <stdio.h>\n' + 'int main() {\n' + testRunners.join('\nprintf("$$$\\n");\n') + '\n}';
      };
    case 'Python':
    default:
      return (tests) => {
        const testRunners = tests.map(
          ({ inputs, outputs }) =>
            inputs.slice(1).join('\n') +
            `\ntry:\n  print(${inputs[0]})\nexcept BaseException as err:\n  print(err)\n` +
            outputs.filter((v, i) => i % 2 === 1).join('\n'),
        );
        return testRunners.join('\nprint("$$$")\n');
      };
  }
};

export default router;
