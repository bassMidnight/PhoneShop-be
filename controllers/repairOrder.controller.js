const { getAllRepairOrders } = require("../services/repairOrder.service.js");
const { dateTimeFormatTH } = require("../utils/dateTimeFormat.js");
exports.getAllRepairOrders = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = parseInt(page) || 1;
    const size = parseInt(limit) || 10;
    let repairOrders = await getAllRepairOrders(
      offset,
      size
    );
    if (!repairOrders) throw new Error("Repair orders not found");
    repairOrders = repairOrders.map((repairOrder) => {
      repairOrder = repairOrder.toJSON();
      repairOrder.createdAt = dateTimeFormatTH(repairOrder.createdAt);
      repairOrder.updatedAt = dateTimeFormatTH(repairOrder.updatedAt);
      return repairOrder;
    });
    res.status(200).json({
      total: repairOrders.count,
      page: offset,
      limit: size,
      data: repairOrders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching repair orders : ${error.message}`});
  }
};
