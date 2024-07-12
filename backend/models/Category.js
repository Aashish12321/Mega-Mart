const mongoose = require("mongoose");

const subCategoryProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [subCategoryProductSchema],
});

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subCategories: [subCategorySchema],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
