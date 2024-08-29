const { mongoose } = require("mongoose");
const Suborder = require("../../models/Suborder");

async function vendorDashboard(req, resp) {
  try {
    let vendorId = req.userId;
    vendorId = new mongoose.Types.ObjectId(vendorId);
    
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );
    const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));

    // pm - previous month
    const pmsuborders = await Suborder.find({
      seller: vendorId,
      createdAt: {
        $lt: endOfLastMonth,
      },
    }).populate({ path: "mainOrder", select: "user" });
    const pmuniqueCustomers = new Set();
    pmsuborders.forEach((suborder) => {
      pmuniqueCustomers.add(suborder.mainOrder.user.toString());
    });
    const pmtotalCustomers = pmuniqueCustomers.size;

    const suborders = await Suborder.find({ seller: vendorId }).populate({
      path: "mainOrder",
      select: "user",
    });
    const uniqueCustomers = new Set();
    suborders.forEach((suborder) => {
      uniqueCustomers.add(suborder.mainOrder.user.toString());
    });

    const totalCustomers = uniqueCustomers.size;
    const changeInCustomers =
      (((totalCustomers - pmtotalCustomers) * 100) / pmtotalCustomers) || 0;

    const newOrders = await Suborder.find({
      seller: vendorId,
      status: { $ne: "Shipped" },
    }).countDocuments();

    const deliveredOrders = await Suborder.find({
      seller: vendorId,
      status: "Shipped",
    }).countDocuments();

    const openOrders = await Suborder.find({
      seller: vendorId,
      status: { $ne: "Shipped" },
    });
    const openOrderValue = openOrders.reduce(
      (acc, order) => acc + order?.subTotal,
      0
    );
    const openAvgOrderValue = openOrderValue / openOrders.length;

    const monthlySales = await Suborder.aggregate([
      {
        $match: {
          seller: vendorId,
          createdAt: {
            $gte: twelveMonthsAgo,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$subTotal" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const allOrders = await Suborder.find({ seller: vendorId });
    const lifetimeSales = allOrders.reduce(
      (acc, order) => acc + order?.subTotal,
      0
    );
    const avgPurchaseOrder = lifetimeSales / allOrders.length;

    resp.status(200).json({
      message: "All Data fetched successfully",
      data: {
        pmtotalCustomers,
        changeInCustomers,
        totalCustomers,
        newOrders,
        deliveredOrders,
        openAvgOrderValue,
        monthlySales,
        lifetimeSales,
        avgPurchaseOrder,
      },
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = vendorDashboard;
