import express from 'express';

const router = express.Router();

router.get('/student', async (req, res) => {
  res.json('Student endpoint hit');
});

export default router;
