import {
  getUsers,
  createUser,
  updateUser,
} from "../controllers/userController.js";

const getUsers = (req, res) => {
  res.json({ message: "User route is working!" });
};
const createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ message: "Name and email are required!" });
  }
  // Here you would typically save the user to the database
  res.status(201).json({ message: "User created successfully", user: newUser });
};
const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  // Here you would typically update the user in the database
  res.json({
    message: `User with ID ${userId} updated successfully`,
    user: updatedUser,
  });
};

export { getUsers, createUser, updateUser };
