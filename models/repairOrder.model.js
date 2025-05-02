module.exports = (sequelize, DataTypes) => {
    const RepairOrder = sequelize.define('RepairOrder', {
      phone: DataTypes.STRING,
      price: DataTypes.FLOAT,
      repairStatus: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue: 'Pending',
      },
      repairDate: DataTypes.DATE,
      receiveDate: DataTypes.DATE,
      repairDetail: DataTypes.TEXT,
    });
  
    return RepairOrder;
  };
  