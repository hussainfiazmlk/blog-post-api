import User from "../models/userModel.js";
import Post from "../models/postModel.js";

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
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
};

Post.belongsTo(User, { as: "user", foreignKey: "userId" }); // puts foreignKey UserId in Post table
