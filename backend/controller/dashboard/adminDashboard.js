const User = require("../../models/User");
const Order = require("../../models/Order");

async function adminDashboard(req, resp) {
  try {
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
    const pmtotalVendors = await User.find({
      role: "VENDOR",
      createdAt: {
        $lt: endOfLastMonth,
      },
    }).countDocuments();
    const totalVendors = await User.find({ role: "VENDOR" }).countDocuments();
    let changeInVendors =
      ((totalVendors - pmtotalVendors) * 100) / pmtotalVendors;
    changeInVendors = parseFloat(changeInVendors).toFixed(2);

    const pmtotalCustomers = await User.find({
      role: "GENERAL",
      createdAt: {
        $lt: endOfLastMonth,
      },
    }).countDocuments();
    const totalCustomers = await User.find({
      role: "GENERAL",
    }).countDocuments();
    let changeInCustomers =
      ((totalCustomers - pmtotalCustomers) * 100) / pmtotalCustomers;
    changeInCustomers = parseFloat(changeInCustomers).toFixed(2);

    const newOrders = await Order.find({
      status: { $ne: "Delivered" },
    }).countDocuments();

    const deliveredOrders = await Order.find({
      status: "Delivered",
    }).countDocuments();

    const openOrders = await Order.find({ status: { $ne: "Delivered" } });
    const openOrderValue = openOrders.reduce(
      (acc, order) => acc + order?.subTotal,
      0
    );
    let openAvgOrderValue = openOrderValue / openOrders.length;
    openAvgOrderValue = parseFloat(openAvgOrderValue).toFixed(2);

    const monthlySales = await Order.aggregate([
      {
        $match: {
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
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    const allOrders = await Order.find();
    const lifetimeSales = allOrders.reduce(
      (acc, order) => acc + order?.subTotal,
      0
    );
    let avgPurchaseOrder = lifetimeSales / allOrders.length;
    avgPurchaseOrder = parseFloat(avgPurchaseOrder).toFixed(2);

    resp.status(200).json({
      message: "All Data fetched successfully",
      data: {
        changeInVendors,
        totalVendors,
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

module.exports = adminDashboard;
