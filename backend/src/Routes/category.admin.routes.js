const { Router } = require("express");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/category.controller");
const {
  createPromotion,
  getPromotions,
  getPromotion,
  updatePromotion,
  deletePromotion,
  getPromotionsCalendar,
} = require("../Controllers/promotion.controller");
const router = Router();

router
  .route("/promotions")
  .post(authRequired, isAdmin, createPromotion)
  .get(authRequired, getPromotions);

router.get("/promotions/calendar", getPromotionsCalendar);

router.route("/promotions/:id").get(authRequired, getPromotions);
router
  .route("/promotion/:id")
  .get(authRequired, getPromotion)
  .put(authRequired, isAdmin, updatePromotion)
  .delete(authRequired, isAdmin, deletePromotion);

router
  .route("/")
  .post(authRequired, isAdmin, createCategory)
  .get(authRequired, getCategories);

router
  .route("/:id")
  .get(authRequired, isAdmin, getCategory)
  .put(authRequired, isAdmin, updateCategory)
  .delete(authRequired, isAdmin, deleteCategory);

module.exports = router;
