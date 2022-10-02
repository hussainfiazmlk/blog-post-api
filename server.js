import dotenv from "dotenv";

import connection from "./config/database.js";
import app from "./app.js";

dotenv.config();

try {
  await connection.sync(); // { force: true }
  console.log("Successfully connected to the database");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
