const { Router } = require("express");
const {
  createCart,
  getCarts,
  createCartItem,
  getCartItems,
  updateCart,
  getCartOrder,
} = require("../Controllers/cart.controller");
const { authRequired } = require("../Middlewares/auth.middleware");
const router = Router();

router.route("/").post(authRequired, createCart).get(authRequired, getCarts);
// router.get("/cart-order", getCartOrder);
router
  .route("/:cartId")
  .post(authRequired, createCartItem)
  .put(authRequired, updateCart);

router.get("/items", authRequired, getCartItems);
module.exports = router;
