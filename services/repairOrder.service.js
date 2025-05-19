const db = require("../models");
const RepairOrder = db.RepairOrder;
const RepairItem = db.RepairItem;
const User = db.User; // หรือ db.Customer ถ้าคุณแยก role
const Product = db.Product;

exports.getAllRepairOrders = async (offset, size, filter) => {
  try {
    const repairOrders = await RepairOrder.findAll({
      include: [
        {
          model: User,
          as: "customer", // ต้องตรงกับ alias ใน association
          attributes: ["firstName", "lastName", "phone", "email"],
          where: filter.phone ? { phone: filter.phone } : {},
        },
      ],
      offset,
      limit: size,
    });

    return repairOrders;
  } catch (err) {
    throw new Error("Error fetching repair orders: " + err.message);
  }
};
