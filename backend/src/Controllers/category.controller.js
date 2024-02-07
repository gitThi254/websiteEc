const { not_found } = require("../Errors/err_function");
const createPromiseAll = require("../Libs/promise");
const Category = require("../Models/category.model");
const Product = require("../Models/product.model");
const Variation = require("../Models/variation.model");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.createCategory = asyncHandleError(async (req, res, next) => {
  const category = req.body;

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
      $lookup: {
        from: "promotions",
        foreignField: "_id",
        localField: "promotion",
        as: "eventPromotion",
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$parent_category_name",
      },
    },

    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$eventPromotion",
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
  ]);
  res.json(categories);
});

exports.getCategoriesAdmin = asyncHandleError(async (req, res, next) => {
  const { name, page } = req.query;
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
      $lookup: {
        from: "promotions",
        foreignField: "_id",
        localField: "promotion",
        as: "eventPromotion",
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$parent_category_name",
      },
    },

    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: "$eventPromotion",
      },
    },
    {
      $match: {
        category_name: { $regex: `.*${name ? name : ""}.*`, $options: "i" },
      },
    },
    {
      $facet: {
        data: [
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: (Number(page ? page : 1) - 1) * 6,
          },
          {
            $limit: 6,
          },
        ],
        totalPage: [
          {
            $count: "total",
          },
        ],
      },
    },
  ]);
  res.json({
    data: categories[0].data,
    totalPage: categories[0]?.totalPage[0]?.total,
  });
});
