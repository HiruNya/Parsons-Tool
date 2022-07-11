import mongoose from "mongoose";

main();

async function main() {
  mongoose
    .connect("mongodb://localhost:27017/mongodb", {
      useNewUrlParser: true,
      user: "admin",
      pass: "password",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Error Connecting to database:", err);
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
}

async function addData() {
  // Add data to database tables
}
