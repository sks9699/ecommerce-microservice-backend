const { statusCode, message } = require("../utilities/message");
const CartService = require("../services/cart.service");
const { successAction, failAction } = require("../utilities/response");

exports.viewCart = async (req, res) => {
  let result = "";
  try {
    result = await CartService.view(req,req.user.id);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.cartFetched));
  } catch (error) {
    console.error("View Cart Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.addOrUpdateItem = async (req, res) => {
  let result = "";
  try {
    result = await CartService.addOrUpdate(req.user.id, req.body);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.cartUpdated));
  } catch (error) {
    console.error("Add/Update Cart Item Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.removeItem = async (req, res) => {
  let result = "";
  try {
    result = await CartService.remove(req.user.id, req.params.productId);

    if (!result) {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.itemNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.itemRemoved));
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};
