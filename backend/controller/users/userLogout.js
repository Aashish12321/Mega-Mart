async function userLogout(req, resp) {
  try {
    resp.status(200).json({
      message: "Logout successful !",
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

module.exports = userLogout;
