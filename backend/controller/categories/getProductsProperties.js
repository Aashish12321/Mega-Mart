const Product = require("../../models/Product");

async function getProductsProperties(_, resp){
    try {
        const products = await Product.distinct("products");

        let productsWithItsBrands = await Promise.all(products?.map(async(productType)=> {
            let brands = await Product.distinct("brand", {products: productType});
            return {products:productType, brands: brands};
        }))

        resp.status(201).json({
            message: 'All Products and its brands fetched successfully',
            data: productsWithItsBrands,
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
