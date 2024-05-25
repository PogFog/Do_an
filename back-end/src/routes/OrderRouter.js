const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleWare,
  authMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create/:id", authUserMiddleWare, OrderController.createOrder);
router.get(
  "/get-all-order/:id",
  authUserMiddleWare,
  OrderController.getAllOrderDetails
);
router.get("/get-details-order/:id", OrderController.getDetailsOrder);
router.delete(
  "/cancel-order/:id",
  authUserMiddleWare,
  OrderController.cancelOrderDetails
);
router.get("/get-all-order", authMiddleware, OrderController.getAllOrder);
router.get("/get-total", OrderController.getTotalAmount);
router.post(
  "/delete-many-order",
  authMiddleware,
  OrderController.deleteManyOrder
);
router.get("/get-best-selling", OrderController.getBestSellingByDay);

module.exports = router;
