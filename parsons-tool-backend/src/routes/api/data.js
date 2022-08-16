import DataLog from '../../database/DataLogSchema';
import express from 'express';

const router = express.Router();

// GET request for retreiving a data logging submission
// Expects: an id in the request parameter, corresponding to id of submission
// Returns: 200 OK if found, 404 Not found, and 400 if bad request

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dataLogItem = await DataLog.findById(id);
    if (dataLogItem) {
      res.json(dataLogItem);
    } else {
      // Respond with 404 Not Found if datalog with id not found
      res.sendStatus(404);
    }
  } catch (error) {
    // Respond with 400 Bad Request if id causes exception
    console.log('[solve.js]>', error);
    res.status(400).json(error).send();
  }
});

// GET request for retrieving all data logging submissions
// Returns: 200 OK with array of datalogs, 404 Not Found

router.get('/', async (req, res) => {
  try {
    const dataLogs = await DataLog.find({});
    res.json(dataLogs);
  } catch (error) {
    console.log('[data.js]>', error);
    res.status(500).json('An issue has occurred on the server end');
  }
});

export default router;
