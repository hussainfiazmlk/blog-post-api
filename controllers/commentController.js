import Comment from "../models/commentModel.js";

// Create new Comment
export const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Get all comments
export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send(comments);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Get Single comment
export const getSingleComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ msg: "Comment updated successfully", data: comment });
  } catch (error) {
    res.status(404).send(error);
  }
};

// delete Comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    res.status(200).send({ msg: "Comment successfully deleted!!" });
  } catch (error) {
    res.status(404).send(error);
  }
};
