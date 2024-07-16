const Category = require("../../models/Category");
const Product = require("../../models/Product");
const fs = require("fs");
async function getCategories(req, resp) {
  try {
    // const allCategory = await Product.distinct('category');
    let allCategory = await Category.find();
    // const jsonContent = JSON.stringify(allCategory); // Convert JSON object to string

    // fs.writeFile("data.json", allCategory, "utf8", function (err) {
    //   if (err) {
    //     console.log("An error occurred while writing JSON Object to File.");
    //     return console.log(err);
    //   }

    //   console.log("JSON file has been saved.");
    // });

    
    // console.log(allCategory);

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
