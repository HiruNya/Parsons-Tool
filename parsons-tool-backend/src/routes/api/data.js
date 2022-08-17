import DataLog from '../../database/DataLogSchema';
import Users from '../../database/UserSchema';
import Problems from '../../database/ProblemSchema';
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
    const aggregate = DataLog.aggregate([
      { $lookup: { from: Users.collection.name, localField: 'userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: Problems.collection.name, localField: 'initialProblem', foreignField: '_id', as: 'problem' } },
      { $unwind: '$problem' },
    ]);
    for await (const doc of aggregate) {
      console.log(doc);
    }

    res.json(aggregate);
  } catch (error) {
    console.log('[data.js]>', error);
    res.status(500).json('An issue has occurred on the server end');
  }
});

export default router;
