const { Order } = require("../models");

module.exports = {
  getAllOrders: async (query) => {
    try {
      const { page = 1, limit = 10, status } = query;
      const filter = {};
      if (status) filter.status = status;

      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("items.productId userId");

      const total = await Order.countDocuments(filter);

      return { total, page, limit, orders };
    } catch (error) {
      console.error("Get All Orders Error:", error);
      throw new Error(error.message || "Failed to fetch orders");
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) return "ordernotexist";

      order.status = status;
      await order.save();

      return order;
    } catch (error) {
      console.error("Update Order Status Error:", error);
      throw new Error(error.message || "Failed to update order status");
    }
  },
};
