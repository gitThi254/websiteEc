const { Router } = require("express");
const {
  createShippingMethod,
  getShippingMethods,
  createOrderStatus,
  getOrderStatuses,
  createPaymentMethod,
  getPaymentMethod,
  createOrder,
  getOrders,
  createOrderLine,
  getOrderLines,
  getAllOrders,
  getAllOrderAdmin,
  getOrderAdmin,
  updateOrder,
} = require("../Controllers/order.controller");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const router = Router();

router.route("/").post(authRequired, createOrder).get(authRequired, getOrders);
router.route("/get-all-orders").get(authRequired, getAllOrders);
router
  .route("/get-all-orders-admin")
  .get(authRequired, isAdmin, getAllOrderAdmin);

router
  .route("/get-all-orders-admin/:id")
  .get(authRequired, isAdmin, getOrderAdmin)
  .put(authRequired, isAdmin, updateOrder);

router
  .route("/order-lines/:id")
  .post(authRequired, createOrderLine)
  .get(authRequired, getOrderLines);

router
  .route("/shipping-method")
  .post(authRequired, isAdmin, createShippingMethod)
  .get(authRequired, getShippingMethods);

router
  .route("/order-status")
  .post(authRequired, isAdmin, createOrderStatus)
  .get(authRequired, getOrderStatuses);

router
  .route("/payment-methods")
  .post(authRequired, isAdmin, createPaymentMethod)
  .get(authRequired, getPaymentMethod);

module.exports = router;
