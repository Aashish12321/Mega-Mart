const Product = require("../../models/Product");

async function searchProducts(req, resp) {
  try {
    const { query } = req.params;
    
    const preprocessQuery = (query) => {
      const cleanedQuery = query.replace(/[^\w\s]/g, "");
      
      return cleanedQuery
        .replace(
          /\bbest|cheap|expensive|top|new|affordable|latest|lowest|budget|discount|under|above|quality|deal|sale|more|between\b/gi,
          ""
        )
        .trim();
    };

    const synonyms = {
      headphones: ["headset", "earphones", "earbuds", "airdopes", "airpods"],
      smartphones: ["mobile", "smartphones", "handset"],
      refrigerator: ["freeze", "fridge", "cooling"],
    };

    const expandQueryWithSynonyms = (query) => {
      let expandedQuery = query;

      Object.keys(synonyms).forEach((term) => {
        // Check if the query includes a synonym or the main term
        if (query.includes(term)) {
          expandedQuery += " " + synonyms[term].join(" ");
        } else {
          synonyms[term].forEach((synonym) => {
            if (query.includes(synonym)) {
              expandedQuery += " " + term + " " + synonyms[term].join(" ");
            }
          });
        }
      });
      return expandedQuery;
    };

    const processedQuery = preprocessQuery(query);
    const expandedQuery = expandQueryWithSynonyms(processedQuery);
    const keywords = expandedQuery.split(" ").filter(Boolean);

    // Use text search if a query is provided
    let results = [];
    if (expandedQuery) {
      results = await Product.find(
        { $text: { $search: expandedQuery } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    }

    // Fallback to regex search if no results from text search
    if (results.length) {
      const regexQueries = keywords.map((keyword) => ({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { brand: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { subCategory: { $regex: keyword, $options: "i" } },
          { products: { $regex: keyword, $options: "i" } },
        ],
      }));

      results = await Product.find({ $or: regexQueries });
    }

    resp.status(200).json({
      message: "Searched products fetched successfully",
      data: results,
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

module.exports = searchProducts;
