const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: String,
    category : {
        type: String,
        required: true
    },
    images: Array,
    description: String,
    price: {
        type: Number,
        required: true
    },
    discount: Number,
    discountType: String,
    sellingPrice: Number
},{
    timestamps: true
})


const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
