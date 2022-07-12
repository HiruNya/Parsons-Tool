import express from 'express';

const router = express.Router();

router.get('/problems', async (req, res) => {
  res.json('Problems endpoint listening');
});

export default router;
