const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');

// ฟังก์ชันสำหรับสร้าง Access Token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// ฟังก์ชันสำหรับสร้าง Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

// ฟังก์ชัน Register
const register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

// ฟังก์ชัน Login
const login = async (phone, password) => {
  const user = await User.findOne({ where: { phone } });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid password');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

// ฟังก์ชันสำหรับรีเฟรช Token
const refreshToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token not provided');

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user) throw new Error('User not found');

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  return { newAccessToken, newRefreshToken };
};

// ฟังก์ชันสำหรับลบ Refresh Token (logout)
const logout = async (refreshToken) => {
  // สามารถจัดการ Refresh Token ใน database ได้ ถ้าต้องการ
  // ตัวอย่าง: การลบ refresh token จากการ logout
  return { message: 'Logged out successfully' };
};

module.exports = { register, login, refreshToken, logout };
