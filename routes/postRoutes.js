import express from "express";
import { createPost, getAllPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/").post(createPost).get(getAllPost);

// router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
