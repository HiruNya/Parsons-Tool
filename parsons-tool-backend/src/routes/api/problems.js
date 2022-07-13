import express from 'express';
import ParsonsProblem from '../../database/ProblemSchema';

const router = express.Router();

router.get('/problems', async (req, res) => {
  res.json('Problems endpoint listening');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const problemItem = await ParsonsProblem.findById(id);
    if (problemItem) {
      res.json(problemItem)
    } else {
      // Respond with 404 Not Found if problem with id not found
      res.sendStatus(404);
    }
  } catch {
    // Respond with 400 Bad Request if id causes exception
    res.sendStatus(400);
  }
})

router.post('/create', async (req, res) => {
  const { newProblem } = req.body.problem;
  let error = '';
  const result = await createNewProblem(newProblem, error);

  if (result) {
    res.status(201).header('location', `/problems/${result.id}`).send();
  } else {
    res.status(500).json(error).send();
  }
})

const createNewProblem = async (obj, err) => {
  if (obj.id === '' || obj.id === undefined || obj.id === null) {
    err = 'Invalid or Missing ID';
    return;
  } else if (obj.name === undefined || obj.name === null) {
    err = 'Invalid or Missing name';
    return;
  } else if (obj.problem === undefined || obj.problem === null) {
    err = 'Invalid or Missing problem field';
    return;
  } else if (obj.problem.blocks === undefined || obj.problem.blocks === null || obj.problem.blocks.length < 1) {
    err = 'Invalid or Missing problem blocks';
    return;
  } else if (obj.problem.solution === undefined || obj.problem.solution === null || obj.problem.solution.length < 1) {
    err = 'Invalid or Missing problem solution';
    return;
  }

  const newProblem = new ParsonsProblem(obj);
  await newProblem.save();
  return newProblem;

}

export default router;
