const { statusCode, message } = require("../utilities/message");
const OrderService = require("../services/order.service");
const { successAction, failAction } = require("../utilities/response");

exports.checkout = async (req, res) => {
  let result = "";
  try {
    result = await OrderService.checkout(req.user.id);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.orderCreated));
  } catch (error) {
    console.error("Checkout Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.payOrder = async (req, res) => {
  let result = "";
  try {
    result = await OrderService.pay(req.params.id);

    if (result=="ordernotfound") {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.orderNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.paymentSuccess));
  } catch (error) {
    console.error("Pay Order Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.getUserOrders = async (req, res) => {
  let result = "";
  try {
    result = await OrderService.getUserOrders(req.user.id, req.query);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.userOrdersFetched));
  } catch (error) {
    console.error("Get User Orders Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.getOrderById = async (req, res) => {
  let result = "";
  try {
    result = await OrderService.getOrderById(req.user.id, req.params.id);

    if (result=="ordernotfound") {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.orderNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.orderFetched));
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};
