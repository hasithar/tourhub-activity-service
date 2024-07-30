const mongoose = require("mongoose");
require("dotenv").config();

const activityTypeSeeder = require("./activityType.seeder");
const activitySeeder = require("./activity.seeder");

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.dbTesting
    : process.env.NODE_ENV === "production"
    ? process.env.dbProduction
    : process.env.dbDevelopment;

mongoose
  .connect(
    `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`
  )
  .then(() => {
    console.log("Connected to the databse");
    runSeeders();
  })
  .catch(() => console.log("Error connecting to the database"));

// run seeders
const runSeeders = async () => {
  try {
    // run activity type seeder
    await activityTypeSeeder();
    console.log("Activity types seeded successfully");

    // run activitys seeder
    await activitySeeder();
    console.log("Activities seeded successfully");

    // close db connection
    mongoose.connection.close();
    console.log("DB seeding completed and connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    mongoose.connection.close();
  }
};
