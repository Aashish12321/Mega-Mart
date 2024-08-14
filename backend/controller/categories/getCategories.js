const Category = require("../../models/Category");

async function getCategories(req, resp) {
  try {
    let allCategory = await Category.find();

    resp.status(201).json({
      message: "Categories fetched successful",
      data: allCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = getCategories;
