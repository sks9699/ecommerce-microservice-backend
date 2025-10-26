const mongoose = require("mongoose");
const { Order, Cart, Product } = require("../models");
// const { queueEmail } = require("../utils/emailQueue");

module.exports = {
  /**
   * 🛒 Checkout: creates a pending order & reserves stock
   */
  checkout: async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

      let totalAmount = 0;

      // ✅ Reserve stock for each product
      for (let item of cart.items) {
        const product = item.productId;

        if (item.quantity > product.stock.available) {
          throw new Error(`${product.name} is out of stock`);
        }

        await Product.updateOne(
          { _id: product._id },
          {
            $inc: {
              "stock.available": -item.quantity,
              "stock.reserved": item.quantity,
            },
          },
          { session }
        );

        totalAmount += item.quantity * product.price;
      }

      // ✅ Create order
      const [order] = await Order.create(
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

      // (optional) clear cart after checkout
      await Cart.deleteOne({ userId }, { session });

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Checkout Error:", error);
      throw new Error(error.message || "Checkout failed");
    }
  },

  /**
   * 💳 Pay: confirms successful payment and finalizes order
   */
  pay: async (orderId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).populate("items.productId");
      if (!order || order.status !== "PENDING_PAYMENT") {
        throw new Error("Order not found or already processed");
      }

      // ✅ Clear reserved stock
      for (let item of order.items) {
        await Product.updateOne(
          { _id: item.productId._id },
          { $inc: { "stock.reserved": -item.quantity } },
          { session }
        );
      }

      order.status = "PAID";
      await order.save({ session });

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

  /**
   * ❌ Handle Payment Failure: cancel order and release reserved stock
   */
  handlePaymentFailure: async (orderId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).populate("items.productId");
      if (!order) throw new Error("Order not found");
      if (order.status !== "PENDING_PAYMENT")
        throw new Error("Order already processed");

      for (const item of order.items) {
        await Product.updateOne(
          { _id: item.productId._id },
          {
            $inc: {
              "stock.available": item.quantity,
              "stock.reserved": -item.quantity,
            },
          },
          { session }
        );
      }

      order.status = "CANCELLED";
      await order.save({ session });

      await session.commitTransaction();
      session.endSession();

      console.log(`❌ Payment failed for order ${order._id}, stock released.`);
      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Payment Failure Handler Error:", error);
      throw new Error(error.message || "Failed to handle payment failure");
    }
  },

  /**
   * ⏰ Auto-cancel unpaid orders after 15 minutes
   */
  cancelUnpaidOrders: async () => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

      const unpaidOrders = await Order.find({
        status: "PENDING_PAYMENT",
        createdAt: { $lte: fifteenMinutesAgo },
      }).populate("items.productId");

      for (const order of unpaidOrders) {
        for (const item of order.items) {
          await Product.updateOne(
            { _id: item.productId._id },
            {
              $inc: {
                "stock.available": item.quantity,
                "stock.reserved": -item.quantity,
              },
            },
            { session }
          );
        }

        order.status = "CANCELLED";
        await order.save({ session });
        console.log(`🕒 Order ${order._id} cancelled due to timeout`);
      }

      await session.commitTransaction();
      session.endSession();

      if (unpaidOrders.length > 0)
        console.log(
          `✅ Released stock for ${unpaidOrders.length} unpaid orders.`
        );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Auto Cancel Error:", error);
    }
  },

  /**
   * 📜 Get paginated orders for a user
   */
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

  /**
   * 🔍 Get single order by ID
   */
  getOrderById: async (userId, orderId) => {
    try {
      const order = await Order.findOne({ _id: orderId, userId }).populate(
        "items.productId"
      );
      if (!order) return "ordernotfound";
      return order;
    } catch (error) {
      console.error("Get Order By ID Error:", error);
      throw new Error(error.message || "Failed to fetch order");
    }
  },
};
