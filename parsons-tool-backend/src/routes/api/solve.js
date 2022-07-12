import express from 'express';

const router = express.Router();

router.get('/solve', async (req, res) => {
  res.json('Solve endpoint listening');
});

export default router;
