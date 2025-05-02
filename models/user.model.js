module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('Admin', 'Staff', 'Customer'),
        defaultValue: 'Customer',
      },
    }, {
      paranoid: true, // เปิด soft delete
      timestamps: true // เปิด createdAt, updatedAt
    });
  
    return User;
  };
  
