const express = require("express");
const router = express.Router();
const RepairOrderController = require("../controllers/repairOrder.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", RepairOrderController.getAllRepairOrders);

module.exports = router;
