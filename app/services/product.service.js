const { Product } = require("../models");

module.exports = {
  create: async (body) => {
    try {
      console.log("product creatting") 
      const product = await Product.create(body);
      return product;
    } catch (error) {
      console.error("Error in create product:", error);
      throw new Error(error.message || "Failed to create product");
    }
  },

  update: async (id, body) => {
    try {
      const product = await Product.findByIdAndUpdate(id, body, { new: true });
      return product; // returns null if not found
    } catch (error) {
      console.error("Error in update product:", error);
      throw new Error(error.message || "Failed to update product");
    }
  },

  delete: async (id) => {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product; // returns null if not found
    } catch (error) {
      console.error("Error in delete product:", error);
      throw new Error(error.message || "Failed to delete product");
    }
  },

  list: async (query) => {
    try {
      const { page = 1, limit = 10, sortBy = "name", order = "asc", name } = query;
      const filter = name ? { name: { $regex: name, $options: "i" } } : {};

      const products = await Product.find(filter)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await Product.countDocuments(filter);

      return { total, page, limit, products };
    } catch (error) {
      console.error("Error in list products:", error);
      throw new Error(error.message || "Failed to fetch products");
    }
  },
};
