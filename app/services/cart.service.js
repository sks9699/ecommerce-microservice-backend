const { Cart, Product } = require("../models");

module.exports = {
view: async (req, user) => {
  try {
    if (req.user.role === "ADMIN") {
      // Admin: view all user carts
      const carts = await Cart.find()
        .populate("userId", "name email")
        .populate("items.productId");
      return carts || [];
    }

    // Regular user: only their own cart
    const cart = await Cart.findOne({ userId: user._id })
      .populate("items.productId");
    return cart || { items: [] };
  } catch (error) {
    console.error("Error in view cart:", error);
    throw new Error(error.message || "Failed to fetch cart");
  }
},

  // 🛒 Add or Update Cart Item
 // 🛒 Add or Update Cart Item
addOrUpdate: async (userId, body, userRole) => {
  try {
    const { productId, quantity } = body;

    // ✅ Validate product and stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // ✅ Only non-admin users should affect stock/cart
    if (userRole === "ADMIN") {
      throw new Error("Admins cannot modify carts");
    }

    // ✅ Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      if (product.stock < quantity) {
        throw new Error("Insufficient stock available");
      }

      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
      return await cart.populate("items.productId");
    }

    // ✅ Check if product already exists in cart
    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    const existingQty = index > -1 ? cart.items[index].quantity : 0;
    const totalRequestedQty = existingQty + quantity;

    if (product.stock < totalRequestedQty) {
      throw new Error("Not enough stock available for the requested quantity");
    }

    if (index > -1) {
      // Update existing item
      cart.items[index].quantity = totalRequestedQty;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return await cart.populate("items.productId");
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
