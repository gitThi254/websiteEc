const asyncHandleError = require("../Utils/asyncHandleError");
const fs = require("fs");
const {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} = require("../Utils/cloudinary");
exports.uploadImages = asyncHandleError(async (req, res, next) => {
  let urls = [];
  const uploader = (path) => cloudinaryUploadImg(path);
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newpath = await uploader(path);
    urls.push(newpath);
    fs.unlinkSync(path);
  }
  const images = urls.map((file) => file);
  res.json(images);
});

exports.deleteImages = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  cloudinaryDeleteImg(id);
  res.json({
    data: id,
  });
});
