const UserService = require("../services/user.service");

exports.getAll = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.update = async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.json({ message: "User updated" });
};

exports.remove = async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};
