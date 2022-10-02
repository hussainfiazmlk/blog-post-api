import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

// Create new Post
export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Get all posts
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "user" }],
    });
    res.status(200).json({ totalPost: posts.length, data: posts });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Get Single Post
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: Comment, as: "comments", attributes: ["comment"] },
        { model: User, as: "user" },
      ],
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ msg: "post updated successfully", data: post });
  } catch (error) {
    res.status(404).send(error);
  }
};

// delete Post
export const deletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.status(200).send({ msg: "user successfully deleted!!" });
  } catch (error) {
    res.status(404).send(error);
  }
};

Post.belongsTo(User, { as: "user", foreignKey: "userId" }); // puts foreignKey UserId in Post table
Post.hasMany(Comment, { as: "comments", foreignKey: "postId" }); // puts foreignKey  in Post table
