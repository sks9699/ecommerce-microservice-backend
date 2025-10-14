const { Cart, Product } = require("../models");

module.exports = {
  view: async (userId) => {
    try {
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      return cart || { items: [] };
    } catch (error) {
      console.error("Error in view cart:", error);
      throw new Error(error.message || "Failed to fetch cart");
    }
  },

  addOrUpdate: async (userId, body) => {
    try {
      const { productId, quantity } = body;

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId, items: [{ productId, quantity }] });
        return cart;
      }

      const index = cart.items.findIndex((i) => i.productId.toString() === productId);
      if (index > -1) {
        cart.items[index].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error in addOrUpdate cart:", error);
      throw new Error(error.message || "Failed to update cart");
    }
  },

  remove: async (userId, productId) => {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) return null;

      const index = cart.items.findIndex((i) => i.productId.toString() === productId);
      if (index === -1) return null;

      cart.items.splice(index, 1);
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error in remove cart item:", error);
      throw new Error(error.message || "Failed to remove cart item");
    }
  },
};
