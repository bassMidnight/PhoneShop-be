// models/repairItemProduct.model.js
module.exports = (sequelize, DataTypes) => {
  const RepairItemProduct = sequelize.define(
    "RepairItemProduct",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      paranoid: true, // เปิด soft delete
      timestamps: true, // เปิด createdAt, updatedAt
    }
  );

  return RepairItemProduct;
};
