import express from 'express';
import ParsonsProblems from '../../database/ProblemSchema';
import Users from '../../database/UserSchema';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const problems = await ParsonsProblems.find({});
    res.json(problems);
  } catch (error) {
    console.log('[student.js]>', error);
    res.status(500).json('An issue has occured on the server end');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ uid: id });
    if (user) {
      res.json(user);
    } else {
      // Respond with 404 Not Found if user id not found
      console.log(`[student.js]> Student with ${id} not found`);
      res.sendStatus(404);
    }
  } catch (error) {
    // Respond with 400 Bad Request if id causes exception
    console.log('[student.js]>', error);
    res.status(400).json(error);
  }
});

router.post('/new', async (req, res) => {
  const { result, error } = await createNewUser(req.body);

  if (result) {
    res.status(201).header('location', `/student/${result._id}`).send();
  } else {
    console.log('[student.js]>', error);
    res.status(500).json(error);
  }
});

const createNewUser = async (obj) => {
  let err = '';
  try {
    if (obj.uid === undefined || obj.uid === null) {
      err = 'Invalid or Missing uid';
    } else if (obj.email === undefined || obj._id === null) {
      err = 'Invalid or Missing email';
    }

    if (err !== '') {
      return { result: false, error: err };
    }

    const newUser = new Users(obj);
    await newUser.save();
    return { result: newUser, error: err };
  } catch (error) {
    return { result: false, error: error };
  }
};

export default router;
