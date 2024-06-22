const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    brand: String,
    costPrice: {
        type: Number,
        required: true
    },
    markedPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    discount: Number,
    discountType: String,
    sellingPrice: {
        type: Number,
        required: true
    },
    images: Array,
    category : {
        type: String,
        required: true
    },
    subCategory : {
        type: String,
    },
},{
    timestamps: true
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
