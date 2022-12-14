import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
