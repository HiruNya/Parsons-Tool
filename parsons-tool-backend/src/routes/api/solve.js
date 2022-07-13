import express from 'express';
import DataLog from '../../database/DataLogSchema';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json('Solve endpoint listening');
});

// POST request for Code Execution
// Expects: a JSON object in the body which contains the code to be evaluated
// Returns: A JSON object with the status of the different tests executed

router.post('/', async (req, res) => {
  // Make call to docker container/other process for execution of code
  // To be done with execution implementation
});

// POST request for data logging submission
// Expects: a JSON object in the body conforming to DataLog model
// Returns: 201 Created if successful, 500 Internal Server Error otherwise with error
router.post('/submisssion', async (req, res) => {
  const { dataLog } = req.body.dataLog;
  let error = '';
  const result = await createDataLogRecord(dataLog, error);

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
const createDataLogRecord = async (obj, err) => {
  if (obj.id === '' || obj.id === undefined || obj.id === null) {
    err = 'Invalid or Missing ID';
    return;
  } else if (obj.userId === undefined || obj.userId === null) {
    err = 'Invalid or Missing userId';
    return;
  } else if (obj.initialProblem === undefined || obj.initialProblem === null) {
    err = 'Invalid or Missing initialProblem';
    return;
  } else if (obj.blockState === undefined || obj.blockState === null) {
    err = 'Invalid or Missing blockState';
    return;
  } else if (obj.dataEvents === undefined || obj.dataEvents === null || obj.dataEvents.length < 1) {
    err = 'Invalid or Missing dataEvents';
    return;
  }

  const newDataLog = new DataLog(obj);
  await newDataLog.save();
  return newDataLog;
};

export default router;
