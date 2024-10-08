const Order = require("../../models/Order");
const Coupon = require("../../models/Coupon");
const Suborder = require("../../models/Suborder");
const Product = require("../../models/Product");


async function createOrder(req, resp) {
  try {
    const userId = req.userId;
    const { order } = req.body;

    let newOrder = new Order({
      user: userId,
      ...order,
    });
    let mainOrder = await newOrder.save();

    let coupon = await Coupon.findOne({ code: order?.coupon });

    let seller = {};
    order?.products?.forEach((product) => {
      if (!seller[product.seller.id]) {
        seller[product.seller.id] = {
          mainOrder: mainOrder?._id,
          seller: product?.seller?.id,
          products: [],
          address: mainOrder?.address,
          payment: mainOrder?.payment,
          subTotal: 0,
          total: 0,
          coupon: "",
          couponDiscount: 0,
          status: "Processing",
        };
      }
      seller[product.seller.id].products.push(product);
      seller[product.seller.id].subTotal +=
        product?.quantity * product?.price?.sell;
      if (
        product?.brand === coupon?.applicableBrand &&
        product?.products === coupon?.applicableProducts
      ) {
        seller[product.seller.id].coupon = mainOrder?.coupon;
        seller[product.seller.id].couponDiscount = mainOrder?.couponDiscount;
      }
    });

    let subOrders = Object.values(seller).map((subOrder) => {
      if (subOrder?.products?.length > 0) {
        return {
          ...subOrder,
          total: subOrder?.subTotal - subOrder?.couponDiscount,
        };
      }
    });

    subOrders.forEach(async (subOrder) => {
      let saveSubOrder = new Suborder(subOrder);
      saveSubOrder = await saveSubOrder.save();
    });


    const updateProduct = async (product) => {
      const updatedProd = await Product.findById(product?._id);
      if (updatedProd) {
        updatedProd?.variants?.forEach((variant) => {
          if (
            variant?._id.toString() === product?.variants[0]?._id.toString()
          ) {
            variant?.specs?.forEach((spec) => {
              if (
                spec?._id.toString() === product?.variants[0]?.specs[0]?._id.toString()
              ) {
                const newAvailable = spec?.available - product?.quantity;
                spec.available = newAvailable < 0 ? 0 : newAvailable;
              }
            });
          }
        });
      }
      await updatedProd.save();
    };

    const updateAllProducts = async () => {
      for (const product of mainOrder?.products) {
        await updateProduct(product);
      }
    };

    await updateAllProducts();

    if (newOrder) {
      resp.status(201).json({
        message: "Order created successfully",
        data: newOrder,
        success: true,
        error: false,
      });
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = createOrder;
