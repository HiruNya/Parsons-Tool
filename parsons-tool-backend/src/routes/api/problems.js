import express from 'express';
import ParsonsProblem from '../../database/ProblemSchema';

const router = express.Router();

// GET request for retreiving a particular parsons problem
// Expects: an id in the request paramter, corresponding to the id of the object
// Returns: 200 OK if found, 404 Not found, and 400 if bad request
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const problemItem = await ParsonsProblem.findById(id);
    if (problemItem) {
      res.json(problemItem);
    } else {
      // Respond with 404 Not Found if problem with id not found
      res.sendStatus(404);
    }
  } catch (err) {
    // Respond with 400 Bad Request if id causes exception
    res.status(400).json(err).send();
  }
});

// POST request for new problem creation
// Expects: a JSON object in the body conforming to ParsonsProblem model
// Returns: 201 Created if successful, 500 Interal Server Error otherwise with error
router.post('/create', async (req, res) => {
  const { result, error } = await createNewProblem(req.body);

  if (result) {
    res.status(201).header('location', `/problems/${result._id}`).send();
  } else {
    res.status(500).json(error).send();
  }
});

// Validates the fields needed are present and returns with an error message or created recorded
const createNewProblem = async (obj) => {
  let err = '';
  try {
    if (obj.name === undefined || obj.name === null) {
      err = 'Invalid or Missing name';
    } else if (obj.problem === undefined || obj.problem === null) {
      err = 'Invalid or Missing problem field';
    } else if (obj.problem.blocks === undefined || obj.problem.blocks === null || obj.problem.blocks.length < 1) {
      err = 'Invalid or Missing problem blocks';
    } else if (obj.problem.solution === undefined || obj.problem.solution === null || obj.problem.solution.length < 1) {
      err = 'Invalid or Missing problem solution';
    }

    if (err !== '') {
      return { result: false, error: err };
    }

    const newProblem = new ParsonsProblem(obj);
    await newProblem.save();
    return { result: newProblem, error: err };
  } catch (error) {
    return { result: false, error: error };
  }
};

export default router;
