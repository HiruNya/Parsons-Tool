import express from 'express';
import axios from 'axios';

import DataLog from '../../database/DataLogSchema';

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
  const code = solutionBlocks.map(blockToLine).join('\n') + '\nprint(LinearSearch([1, 2, 3, 4, 3], 3))';
  console.log(code);
  const { error, result } = await executeOnJobe(code);
  const actual = result.stdout.trimEnd('\n');
  if (actual === '2') {
    return res.json({ result: 'correct' });
  } else {
    return res.json({ result: 'incorrect', actual });
  }
});

// POST request for data logging submission
// Expects: a JSON object in the body conforming to DataLog model
// Returns: 201 Created if successful, 500 Internal Server Error otherwise with error
router.post('/submit', async (req, res) => {
  const { result, error } = await createDataLogRecord(req.body);
  if (result) {
    res.status(201).header('location', `/solve/submission/${result._id}`).send();
  } else {
    res.status(500).json(error).send();
  }
});

// GET request for retreiving a data logging submission
// Expects: an id in the request parameter, corresponding to id of submission
// Returns: 200 OK if found, 404 Not found, and 400 if bad request

router.get('/submission/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dataLogItem = await DataLog.findById(id);
    if (dataLogItem) {
      res.json(dataLogItem);
    } else {
      // Respond with 404 Not Found if datalog with id not found
      res.sendStatus(404);
    }
  } catch (err) {
    // Respond with 400 Bad Request if id causes exception
    res.status(400).json(err).send();
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

const executeOnJobe = (sourceCode) =>
  axios({
    url: 'http://localhost:4000/jobe/index.php/restapi/runs',
    method: 'POST',
    data: {
      run_spec: {
        language_id: 'python3',
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

export default router;
