const getUsers = (req, res) => {
  res.json({ message: "User route is working!" });
};

const createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ message: "Name and email are required!" });
  }
  res.status(201).json({ message: "User created successfully", user: newUser });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.json({
    message: `User with ID ${userId} updated successfully`,
    user: updatedUser,
  });
};
const deleteUser = (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User with ID ${userId} deleted successfully` });
};

export { getUsers, createUser, updateUser, deleteUser };
