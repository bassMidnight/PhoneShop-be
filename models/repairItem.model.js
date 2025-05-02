module.exports = (sequelize, DataTypes) => {
    const RepairItem = sequelize.define('RepairItem', {
      productModel: DataTypes.STRING,
      productType: DataTypes.STRING,
      brand: DataTypes.STRING,
      color: DataTypes.STRING,
    });
  
    return RepairItem;
  };
  