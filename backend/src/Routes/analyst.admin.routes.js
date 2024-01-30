const { Router } = require("express");
const {
  analystBasic,
  analystOrder,
  analystOrderOfWeek,
} = require("../Controllers/analyst.controller");
const router = Router();
router.route("/basic").get(analystBasic);
router.route("/order").get(analystOrder);
router.route("/order/week").get(analystOrderOfWeek);

module.exports = router;
