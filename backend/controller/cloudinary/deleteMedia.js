const cloudinary = require('cloudinary').v2;

async function deleteMedia(req, resp) {
  try {
    const {url} = req.body;
    
    const parts = url.split("/image/upload/");
    const publicId = parts[1].split(".")[0].split("/")[1];

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    // console.log("Delete successful:", response?.result);

    if (response?.result === 'ok') {
      resp.status(200).json({
        message: "Delete successful",
        success: true,
        error: false
      });
    }
    if (response?.result === 'not found'){
      throw new Error("image not found");
    }
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteMedia;
