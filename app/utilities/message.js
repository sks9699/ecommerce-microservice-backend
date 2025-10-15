const statusCode = {
  success: 200,                    // OK
  created: 201,                    // Created
  accepted: 202,                   // Accepted
  noContent: 204,                 // No Content (used when no response body is needed)

  badRequest: 400,                // Bad Request (invalid input, etc.)
  unauthorized: 401,             // Unauthorized (not logged in)
  forbidden: 403,                // Forbidden (no permission)
  notFound: 404,                 // Not Found (resource missing)
  methodNotAllowed: 405,        // Method Not Allowed (e.g. PUT on a GET-only endpoint)
  conflict: 409,                 // Conflict (e.g. duplicate entry)

  unprocessableEntity: 422,      // Unprocessable Entity (e.g. validation error)
  tooManyRequests: 429,          // Too Many Requests (rate limiting)

  internalServerError: 500,      // Internal Server Error
  notImplemented: 501,           // Not Implemented

  // Custom application-level responses (not standard HTTP, but sometimes used in APIs)
  emailOrUserExist: 409,         // Conflict (used for email/user already exists)
  tokenExpired: 401,             // Unauthorized (token expired or invalid)
  wrongPassword: 401,            // Unauthorized (wrong credentials)
  accountDeactivated: 403,       // Forbidden (account exists but disabled)
  notAllowed: 403,               // Same as forbidden
};
const message = {
    userExist:"User with same Detail exist already",
    UserNotExist:"User Not exist ",
      success: "User created successfully",
      orderNotFound:"Order Not Found",
      productNotFound : "Product not found"
}

module.exports = {statusCode,message}