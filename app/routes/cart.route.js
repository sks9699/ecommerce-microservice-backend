const CartController = require("../controllers/cart.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const { validationMiddleware } = require("../validators/Joi.validator.js");


module.exports = (app) => {
  const router = require("express").Router();

  // View cart
  router.get("/getallcartsItems",
     authMiddleware, 
     CartController.viewCart);

  // Add or update item in cart
  router.post(
    "/items",
    authMiddleware,
    validationMiddleware("addOrUpdateCart"), // <-- validate request body
    CartController.addOrUpdateItem
  );

  // Remove item from cart 
  router.delete(
    "/items/:productId",
    authMiddleware,
    // validateParams(idSchema, "productId"), // <-- validate param
    CartController.removeItem
  );

  // Attach all cart routes under /api/cart
  app.use("/api/cart", router);
};
