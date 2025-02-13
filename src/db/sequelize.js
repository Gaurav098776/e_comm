require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };