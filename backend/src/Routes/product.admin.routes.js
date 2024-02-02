const { Router } = require("express");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const {
  createProduct,
  getProducts,
  createProductItem,
  getProductItems,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductItem,
  updateProductItem,
  deleteProductItem,
  getProductDetail,
  TopfiveProductBestSell,
  getProductsClient,
} = require("../Controllers/product.controller");

const router = Router();

router.route("/topFiveProductBestSell").get(TopfiveProductBestSell);

router.route("/").post(authRequired, isAdmin, createProduct).get(getProducts);
router.route("/client").get(getProductsClient);

router
  .route("/items/:id")
  .post(authRequired, isAdmin, createProductItem)
  .get(authRequired, isAdmin, getProductItems);

router
  .route("/item/:id")
  .get(authRequired, isAdmin, getProductItem)
  .put(authRequired, isAdmin, updateProductItem)
  .delete(authRequired, isAdmin, deleteProductItem);
router.route("/item/details/:id").get(getProductDetail);

router
  .route("/:id")
  .get(authRequired, isAdmin, getProduct)
  .put(authRequired, isAdmin, updateProduct)
  .delete(authRequired, isAdmin, deleteProduct);

module.exports = router;
