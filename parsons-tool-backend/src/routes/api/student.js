import express from 'express';
import ParsonsProblems from '../../database/ProblemSchema';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const problems = await ParsonsProblems.find({});
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json('An issue has occured on the server end');
  }
});

export default router;
