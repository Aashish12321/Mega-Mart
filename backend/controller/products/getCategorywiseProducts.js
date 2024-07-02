const Product = require("../../models/Product");

async function getCategorywiseProducts(){
    try {
        const allProducts = await Product.distinct('category');
        console.log(allProducts);

    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getCategorywiseProducts;
