module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductDetail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    paranoid: true, // เปิด soft delete
    timestamps: true // เปิด createdAt, updatedAt
  });

  return Product;
};
