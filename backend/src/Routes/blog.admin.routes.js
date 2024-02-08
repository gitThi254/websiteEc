const { Router } = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  getBlogUser,
  likeBlog,
  disLikeBlog,
  insertBlogMany,
  deleteBlogMany,
} = require("../Controllers/blog.controller");
const { authRequired, isAdmin } = require("../Middlewares/auth.middleware");
const router = Router();

router.put("/likes", authRequired, likeBlog);
router.put("/dislikes", authRequired, disLikeBlog);
router
  .route("/:id")
  .post(authRequired, isAdmin, createBlog)
  .get(authRequired, getBlogUser);

router
  .route("/item/:id")
  .get(authRequired, getBlog)
  .put(authRequired, isAdmin, updateBlog);
router.get("/", authRequired, getBlogs);

router.post("/insert-many/:id", authRequired, isAdmin, insertBlogMany);
router.delete("/delete-many", authRequired, isAdmin, deleteBlogMany);

module.exports = router;
