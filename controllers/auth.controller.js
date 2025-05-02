const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ฟังก์ชัน Login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login(
      phone,
      password
    );
    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ฟังก์ชัน Refresh Token
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { newAccessToken, newRefreshToken } = await AuthService.refreshToken(
      refreshToken
    );
    res.json({ newAccessToken, newRefreshToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ฟังก์ชัน Logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await AuthService.logout(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
