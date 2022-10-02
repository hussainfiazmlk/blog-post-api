import express from "express";
import {
  createComment,
  getAllComment,
  getSingleComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/").post(createComment).get(getAllComment);

router
  .route("/:id")
  .get(getSingleComment)
  .put(updateComment)
  .delete(deleteComment);

export default router;
