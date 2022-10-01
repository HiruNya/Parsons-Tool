import express from 'express';
import ParsonsProblems from '../../database/ProblemSchema';
import Users from '../../database/UserSchema';
import Courses from '../../database/CourseSchema';
import { firebaseAuth } from '../../middleware/auth';
import DataLogSchema from '../../database/DataLogSchema';

const router = express.Router();

// Get a list of all problems in the database
router.get('/', firebaseAuth(true), async (req, res) => {
  if (!req.currentUser) {
    return res.sendStatus(401);
  }
  try {
    const user = await Users.find({ email: req.currentUser.email });
    const courses = await Courses.find({ groupNumber: user.experimentGroup });
    const problems = await ParsonsProblems.find({ _id: { $in: courses } });
    res.json(problems);
  } catch (error) {
    console.log('[student.js]>', error);
    res.status(500).json('An issue has occurred on the server end');
  }
});

// Get a list of problems for a specific group/course
router.get('/problems/:group', firebaseAuth(true), async (req, res) => {
  const { group } = req.params;
  try {
    const user = await Users.findOne({ email: req.currentUser.email });
    if (group != user.experimentGroup) {
      return res.sendStatus(403);
    }
    const course = await Courses.findOne({ groupNumber: group });
    const problems = await ParsonsProblems.find({ _id: { $in: [...course.problems] } });
    const doneProblems = await DataLogSchema.find(
      { initialProblem: { $in: [...course.problems] }, userId: user._id },
      { initialProblem: true },
    );
    if (!problems) {
      return res.sendStatus(404);
    }
    const filteredProblems = problems.filter((p) => !doneProblems.some((d) => d._doc.initialProblem == p._doc._id));
    return res.json(
      // problems.map((p) =>
      //   doneProblems.some((d) => d._doc.initialProblem == p._doc._id) ? { ...p._doc, done: true } : p._doc,
      filteredProblems.length === 0 && problems.length > 0
        ? problems.map((p) => ({ ...p._doc, done: true }))
        : filteredProblems,
    );
  } catch (error) {
    console.log('[student.js]>', error);
    res.status(500).json('An issue has occurred on the server end');
  }
});

// Get a list of all users in the database
router.get('/all', firebaseAuth(true), async (req, res) => {
  const user = await Users.find({ email: req.currentUser.email });
  if (!user?.roles.any((r) => ['lecturer', 'researcher'].includes(r))) {
    return res.sendStatus(403);
  }
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    console.log('[student.js]>', error);
    res.status(500).json('An issue has occurred on the server end');
  }
});

// GET all the problems a user has completed
router.get('/completedProblems', firebaseAuth(true), async (req, res) => {
  const user = await Users.findOne({ email: req.currentUser.email });
  if (!user) {
    return res.sendStatus(403);
  }
  const problems = await Courses.aggregate([
    { $match: { groupNumber: user.experimentGroup } },
    { $unwind: '$problems' },
    { $addFields: { problemObjectId: { $toObjectId: '$problems' } } },
    {
      $lookup: {
        from: 'parsonsproblems',
        localField: 'problemObjectId',
        foreignField: '_id',
        as: 'problemObject',
      },
    },
    {
      $lookup: {
        from: 'datalogs',
        localField: 'problems',
        foreignField: 'initialProblem',
        as: 'datalogs',
        pipeline: [{ $match: { userId: user._id.toString() } }],
      },
    },
    {
      $set: {
        completedTime: {
          $min: '$datalogs.timestamp',
        },
      },
    },
    {
      $project: {
        _id: true,
        problemId: '$problemObjectId',
        problemName: { $first: '$problemObject.name' },
        completedTime: true,
      },
    },
  ]);
  return res.json(problems);
});

// Get a particular student based on their email
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // const thisUser = await Users.find({ email: req.currentUser.email });
  // if (!thisUser?.roles.any((r) => ['lecturer', 'researcher'].includes(r))) {
  //   return res.sendStatus(403);
  // }
  try {
    const user = await Users.findOne({ email: id });
    if (user) {
      console.log(`[student.js]> Student '${id}' found`);
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

// Create a new user
router.post('/new', async (req, res) => {
  const { result, error } = await createNewUser(req.body);

  if (result) {
    console.log('[student.js]> New User record: ', result);
    res.status(201).header('location', `/student/${result._id}`).send();
  } else {
    console.log('[student.js]>', error);
    if (error === 'Invalid Domain') {
      res.status(400).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

// Get a group number for a new student
const getGroupNumber = async () => {
  const userNumber = await Users.countDocuments({ roles: { $size: 1 }, roles: ['student'] });
  return (userNumber % 4) + 1;
};

const createNewUser = async (obj) => {
  let err = '';
  console.log('[createNewUser] ', obj);
  try {
    if (obj.email === undefined || obj.email === null) {
      err = 'Invalid or Missing email';
    }
    if (obj.email.indexOf('@aucklanduni.ac.nz') === -1) {
      err = 'Invalid Domain';
    }

    if (err !== '') {
      return { result: false, error: err };
    }

    const groupNumber = await getGroupNumber();
    obj.experimentGroup = groupNumber;
    console.log('[student.js]> New User:', obj);
    const newUser = new Users(obj);
    await newUser.save();
    return { result: newUser, error: err };
  } catch (error) {
    return { result: false, error: error };
  }
};

export default router;
