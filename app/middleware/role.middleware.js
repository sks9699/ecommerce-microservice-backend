const { statusCode, message } = require("../utilities/message");
const { failAction } = require("../utilities/response");

module.exports = (requiredRole) => {
  return (req, res, next) => {
    try {

      // console.log("role checking==>", )
      if (!req.user || req.user.role !== requiredRole) {
        return res
          .status(statusCode.forbidden)
          .json(failAction(statusCode.forbidden, null, message.forbiddenAccess));
      }
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      return res
        .status(statusCode.internalServerError)
        .json(failAction(statusCode.internalServerError, null, error.message));
    }
  };
};
