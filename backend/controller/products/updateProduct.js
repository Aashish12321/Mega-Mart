const Product = require("../../models/Product")

async function updateProduct(req, resp) {
    try {
        const {_id, ...restBody} = req.body;
        const productData = await Product.findByIdAndUpdate(_id, restBody);
        if (productData){
            resp.status(200).json({
                data: productData,
                message: "Product updated successfully",
                success: true,
                error: false
            })
        }
        else{
            throw new Error('Some error occurs, please try again');
        }
    } catch (err) {
        resp.status(400).json({
            message: err.message || err,
            error: true,
            success: false        
        })
    }
}
module.exports = updateProduct;
