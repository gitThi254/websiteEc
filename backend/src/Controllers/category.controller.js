const { not_found } = require("../Errors/err_function");
const createPromiseAll = require("../Libs/promise");
const Category = require("../Models/category.model");
const Product = require("../Models/product.model");
const Variation = require("../Models/variation.model");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.createCategory = asyncHandleError(async (req, res, next) => {
  const category = req.body;
  Object.keys(category).forEach((key) => {
    if (category[key] === 0 || category[key] === "") {
      delete category[key];
    }
  });

  const newCategory = await Category.create(category);
  return res.status(201).json(newCategory);
});

exports.getCategory = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return next(not_found("Category", id));
  res.json(category);
});

exports.updateCategory = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!category) return next(not_found("Category", id));
  res.json(category);
});

exports.deleteCategory = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findCategoryByProduct = Product.find({ category_id: id });
  const findCategoryByVariation = Variation.find({ category_id: id });
  const checkCategory = await createPromiseAll([
    findCategoryByProduct,
    findCategoryByVariation,
  ]);

  const category = checkCategory.map((item) => item.length);

  if (category.includes(0)) {
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!category) return next(not_found("Category", id));
    return res.json(deleteCategory);
  } else {
    return res.status(400).json("You can't delete category");
  }
});

exports.getCategories = asyncHandleError(async (req, res, next) => {
  // const categories = await Category.find().populate(
  //   "parent_category_id promotion"
  // );
  const { name } = req.query;
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "parent_category_id",
        as: "parent_category_name",
      },
    },
    {
      $match: {
        category_name: { $regex: `.*${name ? name : ""}.*`, $options: "i" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  res.json(categories);
});
