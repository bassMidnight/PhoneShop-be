require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const db = require('./models'); // import models/index.js
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

app.use('/api/phone-shop', apiRouter);

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/products', productRoutes);

// Migration function (sync models)
const runMigrations = async () => {
  try {
    await db.sequelize.sync({ alter: true }); // หรือใช้ { force: true } เพื่อ drop แล้วสร้างใหม่
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Failed to sync database:', error);
  }
};

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await runMigrations(); // เรียก migration หลังจาก server start
});
