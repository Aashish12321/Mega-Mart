const Category = require("../../models/Category");

async function addCategory(req, resp) {
  try {
    // const payload = {
    //   category: req.body.category,
    //   subCategory: [
    //     {
    //       name: req.body.subCategory,
    //       product: [
    //         {
    //           name: req.body.product,
    //         }
    //       ]
    //     }
    //   ]
    // }
    const catgName = req.body.category;
    const subCatgName = req.body.subCategory;
    const prodName = req.body.product;

    let category = await Category.findOneAndUpdate(
      { name: catgName },
      { $setOnInsert: { name: catgName } },
      { new: true, upsert: true }
    );

    let subCategory = category.subCategories.find(
      (subCategory) => subCategory.name === subCatgName
    );
    if (!subCategory) {
      subCategory = { name: subCatgName, products: [] };
      category.subCategories.push(subCategory);
    }

    let product = subCategory.products.find(
      (product) => product.name === prodName
    );
    if (!product) {
      product = { name: prodName };
      subCategory.products.push(product);
    }

    const saveCategory = await category.save();
    // console.log(saveCategory);
    if (saveCategory) {
      resp.status(201).json({
        message: "Upsert operation completed",
        data: category,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Upsert operation failed");
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = addCategory;
