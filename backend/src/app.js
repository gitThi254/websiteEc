const express = require("express");
const CustomError = require("./Utils/CustomError");
const globalErrorhandle = require("./Controllers/error.controller");
const authRoutes = require("./Routes/auth.admin.routes");
const categoryRoutes = require("./Routes/category.admin.routes");
const productRoutes = require("./Routes/product.admin.routes");
const variationRoutes = require("./Routes/variation.admin.routes");
const cartRoutes = require("./Routes/cart.admin.routes");
const orderRoutes = require("./Routes/order.admin.routes");
const reviewRoutes = require("./Routes/review.admin.routes");
const blogRoutes = require("./Routes/blog.admin.routes");
const uploadRoutes = require("./Routes/upload.admin.routes");
const analystRoutes = require("./Routes/analyst.admin.routes");

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://website-ec-admin.vercel.app",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/variations", variationRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/analyst", analystRoutes);

app.use("*", (req, res, next) =>
  next(new CustomError(`Can't not find ${req.originalUrl} on the server`, 400))
);

app.use(globalErrorhandle);

module.exports = app;
