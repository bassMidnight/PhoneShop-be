const User = require('../models/user.model');

exports.getAllUsers = () => User.findAll();
exports.getUserById = (id) => User.findByPk(id);
exports.updateUser = (id, data) => User.update(data, { where: { id } });
exports.deleteUser = (id) => User.destroy({ where: { id } });
