import dotenv from "dotenv";
import express from "express";
import Sequelize from "sequelize";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dialect = process.env.DIALECT;

const connection = new Sequelize(db, user, password, {
  host,
  dialect,
});

try {
  connection.authenticate();
  console.log("Successfully connected to the database");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
