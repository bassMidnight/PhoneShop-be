module.exports = (sequelize, DataTypes) => {
    const RepairItem = sequelize.define('RepairItem', {
      productModel: DataTypes.STRING,
      productType: DataTypes.STRING,
      brand: DataTypes.STRING,
      color: DataTypes.STRING,
    }, {
      paranoid: true, // เปิด soft delete
      timestamps: true // เปิด createdAt, updatedAt
    });
  
    return RepairItem;
  };
  