
const { sequelize } = require("../sequelize");
// const Product = require("./model/Product");

const syncModels = async () => {
  try {
    // Sync all models with alter table
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized successfully");
  } catch (error) {
    console.error("❌ Sync error:", error);
    process.exit(1);
  }
};

module.exports = syncModels;