const UserController = require("../controllers/auth.controller.js");
const { validationMiddleware } = require("../validators/Joi.validator.js");


module.exports = (app) => {
  const router = require("express").Router();

  // Register new user
  router.post(
    "/register",
    validationMiddleware("register"), // <-- validator added here
    UserController.register
  );

  // Login user
  router.post(
    "/login",
    validationMiddleware("login"), // <-- validator added here
    UserController.login
  );

  // Attach all auth routes under /api/auth
  app.use("/api/auth", router);
};
