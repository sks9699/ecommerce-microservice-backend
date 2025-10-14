const ProductController = require("../controllers/products.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const adminAuthMiddleware = require("../middleware/admin.middleware.js")
const roleMiddleware = require("../middleware/role.middleware.js");
const { validationMiddleware } = require("../validators/Joi.validator.js");


module.exports = (app) => {
  const router = require("express").Router();

  // List all products (public)
  router.get("/allproduct", 
    authMiddleware,
    ProductController.listProducts);
// console.log("checkig===>", )
  // Admin routes
  router.post(
    "/create",
adminAuthMiddleware,
    validationMiddleware("createProduct"), // <-- validate body
    ProductController.createProduct
  );

  router.put(
    "/update/:id",
   adminAuthMiddleware,

    // validateParams(idSchema, "id"),         // <-- validate param
    validationMiddleware("updateProduct"), // <-- validate body
    ProductController.updateProduct
  );

  router.delete(
    "/delete/:id",
adminAuthMiddleware,

    // validateParams(idSchema, "id"), // <-- validate param
    ProductController.deleteProduct
  );

  // Attach all product routes under /api/products
  app.use("/api/products", router);
};
