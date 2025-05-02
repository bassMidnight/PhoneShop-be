const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user.model')(sequelize, DataTypes);
const RepairItem = require('./repairItem.model')(sequelize, DataTypes);
const RepairOrder = require('./repairOrder.model')(sequelize, DataTypes);

// ความสัมพันธ์ระหว่าง RepairOrder กับ RepairItem (One-to-Many)
RepairOrder.hasMany(RepairItem, { foreignKey: 'orderId' });
RepairItem.belongsTo(RepairOrder, { foreignKey: 'orderId' });

// RepairOrder กับ Customer
User.hasMany(RepairOrder, { foreignKey: 'customerId', as: 'customerOrders' });
RepairOrder.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

// RepairOrder กับ Repairer
User.hasMany(RepairOrder, { foreignKey: 'repairerId', as: 'repairerOrders' });
RepairOrder.belongsTo(User, { foreignKey: 'repairerId', as: 'repairer' });

module.exports = {
  sequelize,
  User,
  RepairItem,
  RepairOrder,
};
