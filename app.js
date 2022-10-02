import express from "express";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
