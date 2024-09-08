const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

async function getAllProducts(req, resp) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    let products = [];
    if (user?.role === "ADMIN") {
      products = await Product.find().sort({ updatedAt: -1 });
    } else {
      products = await Product.find({"seller.id": user?._id }).sort({ updatedAt: -1 });
    }


    // const products = await Product.find().sort({ updatedAt: -1 });

    // let modified = 0;
    // const updateProduct = async (product) => {
    //   product?.variants?.forEach((variant) => {
    //     variant?.specs?.forEach((spec) => {
    //       spec.available = spec?.stock;
    //       modified += 1;
    //     });
    //   });
    //   await product.save();
    // };

    // const updateAllProducts = async () => {
    //   for (const product of products) {
    //     await updateProduct(product); // Await the async updateProduct function
    //   }
    //   console.log(modified, "Products modified");
    // };

    // await updateAllProducts();

    // ___________________________________________________

    // const orders = await Order.find();
    // let modified = 0;
    // let productsWithoutAvailable = [];

    // const updateProduct = async (product) => {
    //   const updatedProd = await Product.findById(product?._id);
    //   if (updatedProd) {
    //     updatedProd?.variants?.forEach((variant) => {
    //       if (
    //         variant?._id.toString() === product?.variants[0]?._id.toString()
    //       ) {
    //         variant?.specs?.forEach((spec) => {
    //           if (
    //             spec?._id.toString() === product?.variants[0]?.specs[0]?._id.toString()
    //           ) {
    //             const newAvailable = spec?.available - product?.quantity;
    //             if (newAvailable < 0){
    //               productsWithoutAvailable.push(product?._id);
    //             }
    //             spec.available = newAvailable < 0 ? 0 : newAvailable;
    //             modified += 1;
    //           }
    //         });
    //       }
    //     });
    //   }
    //   await updatedProd.save();
    // };

    // const updateAllProducts = async () => {
    //   for (const order of orders) {
    //     for (const product of order.products) {
    //       await updateProduct(product);
    //     }
    //   }
    //   console.log(productsWithoutAvailable);
    //   console.log(modified, "Products modified");
    // };

    // await updateAllProducts();

    resp.status(200).json({
      message: "All products fetched successfully",
      data: products,
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

module.exports = getAllProducts;
