import express from "express";
import {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").post(createPost).get(getAllPost);

router.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

export default router;
