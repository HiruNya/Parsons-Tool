import express from 'express';
import api from './api/api';
import solve from './api/solve';
import problems from './api/problems';
import student from './api/student';
import data from './api/data';

const router = express.Router();

router.use('/api', api);
router.use('/solve', solve);
router.use('/problems', problems);
router.use('/student', student);
router.use('/data', data);

export default router;
