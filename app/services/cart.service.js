const { Cart, Product } = require("../models");

module.exports = {
view: async (req,user) => {
  try {
    // console.log("admin detail===>", req.user)
    if (req.user.role == 'ADMIN') {
      // 🧩 Admin: show all carts
      const carts = await Cart.find()
        .populate('userId', 'name email') // show which user owns each cart
        .populate('items.productId'); // show product details

      return carts || [];
    }

    // 👤 Regular user: show only their own cart
    const cart = await Cart.findOne({ userId: user._id })
      .populate('items.productId');

    return cart || { items: [] };
  } catch (error) {
    console.error('Error in view cart:', error);
    throw new Error(error.message || 'Failed to fetch cart');
  }
},

  // 🛒 Add or Update Cart Item
  addOrUpdate: async (userId, body) => {
    try {
      const { productId, quantity } = body;

      // ✅ Validate product and stock
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < quantity) {
        throw new Error("Insufficient stock available");
      }

      // ✅ Find or create cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId, items: [{ productId, quantity }] });
        return await cart.populate("items.productId");
      }

      // ✅ Check if product already exists in cart
      const index = cart.items.findIndex(
        (i) => i.productId.toString() === productId
      );

      if (index > -1) {
        // 🔁 Instead of replacing, increase quantity
        const newQuantity = cart.items[index].quantity + quantity;

        if (newQuantity > product.stock) {
          throw new Error("Not enough stock for requested quantity");
        }

        cart.items[index].quantity = newQuantity;
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
