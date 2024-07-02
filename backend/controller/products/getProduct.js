const Product = require("../../models/Product");

async function getProduct(req, resp){
    try {
        const product = await Product.find().sort({createdAt: -1})

        resp.status(201).json({
            message: 'All products fetched successfully',
            data: product,
            success: true,
            error: false
        })

    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProduct;