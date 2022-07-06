import express from 'express';
import {api, solve, problems} from './api/*';

const router = express.Router();


router.use('/api', api);
router.use('/solve', solve);
router.use('/problems', problems)

export default router;