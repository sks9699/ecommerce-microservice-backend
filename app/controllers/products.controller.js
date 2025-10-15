const { statusCode, message } = require("../utilities/message");
const ProductService = require("../services/product.service");
const { successAction, failAction } = require("../utilities/response");

exports.createProduct = async (req, res) => {
  let result = "";
  try {
    result = await ProductService.create(req.body);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.productCreated));
  } catch (error) {
    console.error("Create Product Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.updateProduct = async (req, res) => {
  let result = "";
  try {
    result = await ProductService.update(req.params.id, req.body);

    if (result == "productnotfound") {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.productNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.productUpdated));
  } catch (error) {
    console.error("Update Product Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.deleteProduct = async (req, res) => {
  let result = "";
  try {
    result = await ProductService.delete(req.params.id);

    if (result == "productnotfound") {
      return res
        .status(statusCode.notFound)
        .json(failAction(statusCode.notFound, result, message.productNotFound));
    }

    return res
      .status(statusCode.success)
      .json(successAction(result, message.productDeleted));
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};

exports.listProducts = async (req, res) => {
  let result = "";
  try {
    result = await ProductService.list(req.query);

    return res
      .status(statusCode.success)
      .json(successAction(result, message.productList));
  } catch (error) {
    console.error("List Products Error:", error);
    return res
      .status(statusCode.internalServerError)
      .json(failAction(statusCode.internalServerError, result, error.message));
  }
};
