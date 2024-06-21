const Product = require("../models/Product");
const User = require("../models/User");

async function uploadProduct(req, resp){
    try {
        const userId =  req.userId;
        let user = await User.findById(userId);
        if (user.role === 'ADMIN'){
            let payload = {
                ...req.body
            }
            const productData = new Product(payload);
            const saveProduct = await productData.save();
    
            resp.status(201).json({
                data: saveProduct,
                success: true,
                error: false,
                message: 'Product added successfully!'
            })
        }
        else{
            throw new Error("You do not have permission to upload the product.")
        }
    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = uploadProduct;
