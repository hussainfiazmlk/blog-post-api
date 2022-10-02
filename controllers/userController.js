import User from "../models/userModel.js";
// import _users from "./data/users.json" assert { type: "json" };

// router.get("/", async (req, res) => {
//   try {
//     await User.bulkCreate(_users);
//     res.json("successfully added users");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error);
//   }
// });

// Create new users
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body.user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // { where: { firstname: [Op.like]: "D%"}}
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ msg: "user updated successfully", data: user });
  } catch (error) {
    res.status(404).send(error);
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).send({ msg: "user successfully deleted!!" });
  } catch (error) {
    res.status(404).send(error);
  }
};
