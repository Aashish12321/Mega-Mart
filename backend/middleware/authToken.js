const jwt = require("jsonwebtoken");

async function authToken(req, resp, next) {
  try {
    const token = req.headers["authorization"];
    // console.log(token);

    if (token === "null") {
      // console.log("Permission denied ! Please provide the token");
      throw new Error("Please login to continue");
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      // console.log("decoded",decoded._id);
      if (err) {
        throw new Error(err.name);
      }
      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
