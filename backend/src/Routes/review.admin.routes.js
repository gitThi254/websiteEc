const { Router } = require("express");
const {
  createReviews,
  getReviews,
} = require("../Controllers/review.controller");
const { authRequired } = require("../Middlewares/auth.middleware");
const router = Router();

router.route("/:id").post(authRequired, createReviews).get(getReviews);
module.exports = router;
