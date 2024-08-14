const Product = require("../../models/Product");

async function getProductsProperties(_, resp){
    try {
        const category = await Product.distinct("category");
        const subCategory = await Product.distinct("subCategory");
        const products = await Product.distinct("products");
        const brand = await Product.distinct("brand");

        resp.status(201).json({
            message: 'All Properties fetched successfully',
            data: {
                category: category,
                subCategory: subCategory,
                products: products,
                brand: brand
            },
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

module.exports = getProductsProperties;
