const orderModel = require("../models/orders");

class Order {

  // ✅ ADMIN - Get all orders
  async getAllOrders(req, res) {
    try {
      const Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });

      return res.json({ Orders });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  // ✅ USER - Get own orders
  async getOrderByUser(req, res) {
    const { uId } = req.body;

    if (!uId)
      return res.json({ message: "User ID required" });

    try {
      const Order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });

      return res.json({ Order });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  // ✅ CREATE ORDER (NO PAYMENT GATEWAY)
  async postCreateOrder(req, res) {
    const { allProduct, user, amount, address, phone } = req.body;

    if (!allProduct || !user || !amount || !address || !phone) {
      return res.json({ message: "All fields are required" });
    }

    try {
      const newOrder = new orderModel({
        allProduct,
        user,
        amount,
        address,
        phone,
        paymentMethod: "COD",
        status: "pending",
        transactionId: "COD-" + Date.now()
      });

      await newOrder.save();

      return res.json({
        success: true,
        message: "Order placed successfully"
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Order creation failed" });
    }
  }

  // ✅ ADMIN UPDATE ORDER STATUS
async postUpdateOrder(req, res) {
  try {
    let { oId, status } = req.body;

    if (!oId || !status) {
      return res.json({ message: "All fields required" });
    }

    let updateData = {
      status,
      updatedAt: Date.now(),
    };

    if (status === "Delivered") {
      updateData.completedAt = new Date();
    }

    await orderModel.findByIdAndUpdate(oId, updateData);
    await cartModel.deleteMany({ user: user });

    res.json({ success: "Order updated successfully" });

  } catch (err) {
  console.log("ORDER ERROR =>", err);
  res.status(500).json({
    error: err.message
  });
}
}

  // ✅ DELETE ORDER
  async postDeleteOrder(req, res) {
    const { oId } = req.body;

    if (!oId)
      return res.json({ error: "Order ID required" });

    try {
      await orderModel.findByIdAndDelete(oId);

      res.json({ success: "Order deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Order();