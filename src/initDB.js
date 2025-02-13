
const syncModels = require("./db/model");
const { connectDB } = require("./db/sequelize");

async function initializeDatabase() {
  await connectDB();
  await syncModels();
}

module.exports = initializeDatabase;