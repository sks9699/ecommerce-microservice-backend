const OrdersController = require("../controllers/orders.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const { validationMiddleware } = require("../validators/Joi.validator.js");


module.exports = (app) => {
  const router = require("express").Router();

  // Checkout
  router.post("/checkout", authMiddleware, OrdersController.checkout);

  // Pay order
  router.post(
    "/:id/pay",
    authMiddleware,
    // validateParams(idSchema, "id"), // <-- validate order id param
    OrdersController.payOrder
  );

  // Get all orders for user
  router.get("/allorder", authMiddleware, OrdersController.getUserOrders);

  // Get single order
  router.get(
    "/:id",
    authMiddleware,
    // validateParams(idSchema, "id"), // <-- validate order id param
    OrdersController.getOrderById
  );

  // Attach all order routes under /api/orders
  app.use("/api/orders", router);
};
