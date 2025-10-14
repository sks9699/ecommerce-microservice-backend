const mongoose = require("mongoose");
const { Order, Cart, Product } = require("../models");
// const { queueEmail } = require("../utils/emailQueue");

module.exports = {
  checkout: async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

      let totalAmount = 0;

      // Reserve stock
      for (let item of cart.items) {
        if (item.quantity > item.productId.stock)
          throw new Error(`${item.productId.name} is out of stock`);

        await Product.updateOne(
          { _id: item.productId._id },
          { $inc: { stock: -item.quantity, reservedStock: item.quantity } },
          { session }
        );

        totalAmount += item.quantity * item.productId.price;
      }

      // Create order
      const order = await Order.create(
        [
          {
            userId,
            items: cart.items.map((i) => ({
              productId: i.productId._id,
              quantity: i.quantity,
              priceAtPurchase: i.productId.price,
            })),
            totalAmount,
            status: "PENDING_PAYMENT",
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return order[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Checkout Error:", error);
      throw new Error(error.message || "Checkout failed");
    }
  },
checkout: async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    let totalAmount = 0;

    // Reserve stock
    for (let item of cart.items) {
      if (item.quantity > item.productId.stock.available)
        throw new Error(`${item.productId.name} is out of stock`);

      await Product.updateOne(
        { _id: item.productId._id },
        {
          $inc: {
            "stock.available": -item.quantity,
            "stock.reserved": item.quantity
          }
        },
        { session }
      );

      totalAmount += item.quantity * item.productId.price;
    }

    // Create order
    const order = await Order.create(
      [
        {
          userId,
          items: cart.items.map((i) => ({
            productId: i.productId._id,
            quantity: i.quantity,
            priceAtPurchase: i.productId.price,
          })),
          totalAmount,
          status: "PENDING_PAYMENT",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Checkout Error:", error);
    throw new Error(error.message || "Checkout failed");
  }
},

  pay: async (orderId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).populate("items.productId");
      if (!order || order.status !== "PENDING_PAYMENT") return null;

      // Clear reserved stock
      for (let item of order.items) {
        await Product.updateOne(
          { _id: item.productId._id },
          { $inc: { reservedStock: -item.quantity } },
          { session }
        );
      }

      order.status = "PAID";
      await order.save({ session });

      // Queue confirmation email
      // queueEmail(order.userId, `Your order ${order._id} is confirmed!`);

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Payment Error:", error);
      throw new Error(error.message || "Payment failed");
    }
  },

  getUserOrders: async (userId, query) => {
    try {
      const { page = 1, limit = 10, status } = query;
      const filter = { userId };
      if (status) filter.status = status;

      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("items.productId");

      const total = await Order.countDocuments(filter);

      return { total, page, limit, orders };
    } catch (error) {
      console.error("Get User Orders Error:", error);
      throw new Error(error.message || "Failed to fetch user orders");
    }
  },

  getOrderById: async (userId, orderId) => {
    try {
      const order = await Order.findOne({ _id: orderId, userId }).populate(
        "items.productId"
      );
      return order; // returns null if not found
    } catch (error) {
      console.error("Get Order By ID Error:", error);
      throw new Error(error.message || "Failed to fetch order");
    }
  },
};
