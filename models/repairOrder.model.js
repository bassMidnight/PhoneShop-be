module.exports = (sequelize, DataTypes) => {
  const RepairOrder = sequelize.define("RepairOrder", {
    phone: DataTypes.STRING,
    price: DataTypes.FLOAT,
    repairStatus: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },
    repairDate: DataTypes.DATE,
    receiveDate: DataTypes.DATE,
    repairDetail: DataTypes.TEXT,
  }, {
    paranoid: true, // เปิด soft delete
    timestamps: true // เปิด createdAt, updatedAt
  });

  return RepairOrder;
};
