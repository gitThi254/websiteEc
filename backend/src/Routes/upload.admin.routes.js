const { Router } = require("express");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../Middlewares/uploadImages");
const {
  uploadImages,
  deleteImages,
} = require("../Controllers/upload.controller");
const router = Router();

router.post(
  "/",
  authRequired,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authRequired, isAdmin, deleteImages);

module.exports = router;
