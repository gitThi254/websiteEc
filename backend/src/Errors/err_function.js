const CustomError = require("../Utils/CustomError");

exports.duplicate_key = (value) =>
  new CustomError(`${value} already exists, please use another ${value}`, 400);

exports.not_found = (value, id) =>
  new CustomError(`${value} with ID: ${id} not found`, 404);
