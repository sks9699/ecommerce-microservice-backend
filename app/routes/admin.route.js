const AdminController = require("../controllers/admin.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const adminMiddleware = require("../middleware/admin.middleware.js")
const roleMiddleware = require("../middleware/role.middleware.js");
const { validationMiddleware } = require("../validators/Joi.validator.js");


module.exports = (app) => {
  const router = require("express").Router();

  // Get all orders
  router.get(
    "/orders",
 adminMiddleware,
    AdminController.getAllOrders
  );

  // Update order status
  router.patch(
    "/orders/:id/status",
     adminMiddleware,
    validationMiddleware("updateOrderStatus"),  // <-- validate request body
    AdminController.updateOrderStatus
  );

  // Attach all admin routes under /api/admin
  app.use("/api/admin", router);
};
