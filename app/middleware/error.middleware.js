const { statusCode } = require("../utilities/message");
const { failAction } = require("../utilities/response");

module.exports = (err, req, res, next) => {
  console.error("Global Error:", err);

  const status = err.status || statusCode.internalServerError;
  const message = err.message || "Something went wrong";

  res.status(status).json(failAction(status, null, message));
};
