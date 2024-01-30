const { Router } = require("express");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const {
  createVariation,
  getVariations,
  createVariationOption,
  getVariationOptions,
  getAllVariationOptionOfCategory,
  getVariation,
  updateVariation,
  deleteVariation,
  getVariationOption,
  updateVariationOption,
  deleteVariationOption,
} = require("../Controllers/variantion.controller");
const router = Router();
router
  .route("/")
  .post(authRequired, isAdmin, createVariation)
  .get(authRequired, isAdmin, getVariations);

router.route("/options").post(authRequired, isAdmin, createVariationOption);

router.route("/options/:id").get(authRequired, isAdmin, getVariationOptions);

router
  .route("/products/:id")
  .get(authRequired, isAdmin, getAllVariationOptionOfCategory);

router.route("/:id").get(authRequired, isAdmin, getVariations);
router
  .route("/item/:id")
  .get(authRequired, isAdmin, getVariation)
  .put(authRequired, isAdmin, updateVariation)
  .delete(authRequired, isAdmin, deleteVariation);

router
  .route("/options/item/:id")
  .get(authRequired, isAdmin, getVariationOption)
  .put(authRequired, isAdmin, updateVariationOption)
  .delete(authRequired, isAdmin, deleteVariationOption);

module.exports = router;
