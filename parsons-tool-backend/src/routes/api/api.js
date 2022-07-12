import express from 'express';

const router = express.Router();

router.get('/hello', async (req, res) => {
  res.json('Hello Parsons Problems');
});

export default router;
