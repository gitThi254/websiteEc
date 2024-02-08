const { Router } = require("express");
const router = Router();

const {
  register,
  login,
  logout,
  verifyToken,
  getallUser,
  getUser,
  editUser,
  deleteUser,
  loginAdmin,
  createCountry,
  createAddress,
  getCountries,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
  resetPassword,
  getNofitications,
  insertUserMany,
} = require("../Controllers/auth.controller");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
router.get("/nofitications", authRequired, getNofitications);

router.post("/reset-password", authRequired, resetPassword);
router.post("/register", register);
router.post("/login", login);
router.post("/login-admin", loginAdmin);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/countries", getCountries);
router.get("/addresses", authRequired, getAddresses);

router.get("/all-users", authRequired, isAdmin, getallUser);

router.route("/address").post(authRequired, createAddress);
router
  .route("/address/:id")
  .get(authRequired, getAddress)
  .put(authRequired, updateAddress)
  .delete(authRequired, deleteAddress);

router.route("/country").post(authRequired, isAdmin, createCountry);
router.route("/insert-many").post(authRequired, isAdmin, insertUserMany);

router
  .route("/:id")
  .get(authRequired, isAdmin, getUser)
  .put(authRequired, isAdmin, editUser)
  .delete(authRequired, isAdmin, deleteUser);

module.exports = router;
