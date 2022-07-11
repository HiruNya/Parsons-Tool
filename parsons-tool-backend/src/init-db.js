import mongoose from "mongoose";

main();

async function main() {
  mongoose
    .connect("mongodb://localhost:27017/parsons", {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to database!");
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
      console.log("Disconnected from database!");
    })
    .catch((err) => {
      console.log("Error Disconnecting: ", err);
    });
}

async function clearDatabase() {
  // Clear Database tables
  console.log("Finsihed clearing Database");
}

async function addData() {
  // Add data to database tables
  console.log("Finished adding to database");
}
