const { statusCode, message } = require("../utilities/message");
const AdminService = require("../services/admin.service.js");
const { successAction, failAction } = require("../utilities/response");

exports.getAllOrders = async (req, res) => {
  let result = "";
  try {
    result = await AdminService.getAllOrders(req.query);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.allOrdersFetched));
  } catch (error) {
    console.error("Get All Orders Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.updateOrderStatus = async (req, res) => {
  let result = "";
  try {
    result = await AdminService.updateOrderStatus(req.params.id, req.body.status);

    if (!result) {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.orderNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.orderStatusUpdated));
  } catch (error) {
    console.error("Update Order Status Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};
