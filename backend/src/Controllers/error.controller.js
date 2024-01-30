const { duplicate_key } = require("../Errors/err_function");
const CustomError = require("../Utils/CustomError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.name === "CastError")
    err = new CustomError(
      `Invlalid value ${err.path} for field ${err.value}`,
      400
    );
  if (err.code === 11000) {
    err = Object.keys(err.keyValue)
      ? duplicate_key(Object.keys(err.keyValue)[0])
      : err;
  }
  console.log(err.message);
  res.status(err.statusCode).json([err.message]);
};
