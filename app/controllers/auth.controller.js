const { statusCode, message } = require("../utilities/message");
const UserService = require("../services/user.service");
const { successAction, failAction } = require("../utilities/response");

exports.register = async (req, res) => {
  let result = "";
  try {
    result = await UserService.register(req.body);

    if (result === "UserExist") {
      return res
        .status(statusCode.conflict)
        .json(failAction(statusCode.conflict, result, message.userExist));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.registerSuccess));
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.login = async (req, res) => {
  let result = "";
  try {
    result = await UserService.login(req.body);

    if (result === "UserNotExist") {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.userNotExist));
    }

    if (result == "InvalidPassword") {
      return res
        .status(statusCode.unauthorized)
        .json(failAction(statusCode.unauthorized, result, message.invalidPassword));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.loginSuccess));
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};
