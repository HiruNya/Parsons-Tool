import mongoose from 'mongoose';
import ParsonsProblem from './database/ProblemSchema';
import DataLog from './database/DataLogSchema';
import User from './database/UserSchema';
import data from './database/parsons.json';

main();

async function main() {
  mongoose
    .connect('mongodb://localhost:27017/parsons', {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connected to database!');
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });

  await clearDatabase();
  console.log();

  await addData();
  console.log();

  // Disconnect when complete
  mongoose
    .disconnect()
    .then(() => {
      console.log('Disconnected from database!');
    })
    .catch((err) => {
      console.log('Error Disconnecting: ', err);
    });
}

async function clearDatabase() {
  // Clear Database tables
  let schemaResponse = await ParsonsProblem.deleteMany({});
  console.log(`Finished clearing Database (removed ${schemaResponse.deletedCount}} parsons problems`);
  schemaResponse = await DataLog.deleteMany({});
  console.log(`Finished clearing Database (removed ${schemaResponse.deletedCount}} Datalogs`);
  schemaResponse = await User.deleteMany({});
  console.log(`Finished clearing Database (removed ${schemaResponse.deletedCount}} Users`);
}

async function addData() {
  await Promise.all(
    data.problems.map((problem) => {
      return new ParsonsProblem(problem).save();
    }),
  );
  console.log('Finished adding to database');
}
