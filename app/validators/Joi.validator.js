const Joi = require("joi");
const { statusCode, message } = require("../utilities/message");
const { successAction, failAction } = require("../utilities/response");

// =======================
// Auth Schemas
// =======================
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("USER", "ADMIN").default("USER"),
});

// =======================
// Product Schemas
// =======================
const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow("").optional(),
  stock: Joi.object({
    available: Joi.number().required(),
    reserved: Joi.number().optional().default(0)
  }).required()
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().allow("").optional(),
 stock: Joi.object({
    available: Joi.number().required(),
    reserved: Joi.number().optional().default(0)
  }).optional()
});

// =======================
// Cart Schemas
// =======================
const addOrUpdateCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

// =======================
// Order Schemas
// =======================
const payOrderSchema = Joi.object({
  // For mock payment, no additional fields required, but we can keep orderId optional in body
});

// =======================
// Admin Schemas
// =======================
const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING_PAYMENT", "PAID", "SHIPPED", "DELIVERED", "CANCELLED")
    .required(),
});

// =======================
// Validation Middleware
// =======================
const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: false, // ignore unknown props
    };

    let validationSchema;
    switch (schema) {
      case "login":
        validationSchema = loginSchema;
        break;
      case "register":
        validationSchema = registerSchema;
        break;
      case "createProduct":
        validationSchema = createProductSchema;
        break;
      case "updateProduct":
        validationSchema = updateProductSchema;
        break;
      case "addOrUpdateCart":
        validationSchema = addOrUpdateCartSchema;
        break;
      case "updateOrderStatus":
        validationSchema = updateOrderStatusSchema;
        break;
      default:
        return next();
    }

    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return res
        .status(statusCode.badRequest)
        .json(failAction(statusCode.badRequest, null, error.details[0].message));
    }

    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
    res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, null, error.message));
  }
};

module.exports = { validationMiddleware };
