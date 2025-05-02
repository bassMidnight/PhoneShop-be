require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
