const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route สำหรับ Register
router.post('/register', authController.register);

// Route สำหรับ Login
router.post('/login', authController.login);

// Route สำหรับ Refresh Token
router.post('/refresh', authController.refresh);

// Route สำหรับ Logout
router.post('/logout', authController.logout);

module.exports = router;
