const Product = require("../../models/Product");

async function getCategories(req, resp){
    try {
        const allCategory = await Product.distinct('category');
        
        resp.status(201).json({
            message: 'Categories fetched successful',
            data: {
                allCategory: allCategory, 
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

module.exports = getCategories;
