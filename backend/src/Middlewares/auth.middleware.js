const jwt = require("jsonwebtoken");
const CustomError = require("../Utils/CustomError");
const asyncHandleError = require("../Utils/asyncHandleError");
const User = require("../Models/user.model");

exports.authRequired = asyncHandleError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomError("You are not logged in", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, token) => {
    if (err)
      return next(
        new CustomError("Invalid or token expired, you are loggin again", 401)
      );
    const user = await User.findById(token.id);
    if (!user) return next(new CustomError("User not found", 404));
    req.user = user;
    next();
  });
});

exports.isAdmin = asyncHandleError(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return next(new CustomError("You are not an admin", 400));
  }
  next();
});
