import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const host = process.env.HOST || "localhost";
const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dialect = process.env.DIALECT;

const connection = new Sequelize(db, user, password, {
  host,
  dialect,
  define: {
    freezeTableName: true,
  },
});

export default connection;
