import dotenv from "dotenv";
import express from "express";
import Sequelize, { Op } from "sequelize";

// import _users from "./data/users.json" assert { type: "json" };

dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
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

const User = connection.define(
  "Users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    fullname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        users.fullname = `${users.firstname} ${users.lastname}`;
        console.log("Before create===================================");
      },
    },
  }
);

const Post = connection.define("Posts", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

// app.get("/", async (req, res) => {
//   try {
//     await User.bulkCreate(_users);
//     res.json("successfully added users");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error);
//   }
// });

// Create new users
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body.user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        firstname: {
          [Op.like]: "D%",
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error);
  }
});

// get single user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// update user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ msg: "user updated successfully", data: user });
  } catch (error) {
    res.status(404).send(error);
  }
});

// delete user
app.delete("/users/:id", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).send({ msg: "user successfully deleted!!" });
  } catch (error) {
    res.status(404).send(error);
  }
});

// Create new Post
app.post("/posts", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "user" }],
    });
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
});

Post.belongsTo(User, { as: "user", foreignKey: "userId" }); // puts foreignKey UserId in Post table
try {
  await connection.sync(); // { force: true }
  console.log("Successfully connected to the database");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
