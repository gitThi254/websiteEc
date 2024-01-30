const { Promise } = require("mongoose");
const Variation = require("../Models/variation.model");
const VariationOption = require("../Models/variation_option.model");
const asyncHandleError = require("../Utils/asyncHandleError");
const createPromiseAll = require("../Libs/promise");
const Product = require("../Models/product.model");
const { not_found } = require("../Errors/err_function");
const ProductItem = require("../Models/product_item.model");

exports.createVariation = asyncHandleError(async (req, res, next) => {
  const category = req.body;
  const newVariation = await Variation.create(category);
  return res.status(201).json(newVariation);
});

exports.getVariations = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const variations = await Variation.find(
    id === undefined ? { category_id: id } : {}
  ).populate("category_id");

  res.json(variations);
});

exports.getVariation = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const variation = await Variation.findById(id).populate("category_id");
  if (!variation) return next(not_found("Variation", id));
  res.json(variation);
});

exports.updateVariation = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const variation = await Variation.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!variation) return next(not_found("Variation item", id));
  res.json(variation);
});

exports.deleteVariation = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findVariationItemByVariationOption = VariationOption.find({
    variation_id: id,
  });
  const checkVariation = await createPromiseAll([
    findVariationItemByVariationOption,
  ]);

  const variation = checkVariation.map((item) => item.length);
  if (variation.includes(0)) {
    const deleteVariation = await Variation.findByIdAndDelete(id);
    if (!variation) return next(not_found("Variation", id));
    return res.json(deleteVariation);
  } else {
    return res.status(400).json(`You can't delete variation width ${id}`);
  }
});

exports.getAllVariationOptionOfCategory = asyncHandleError(
  async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(not_found("product", id));
    const variations = await Variation.find(
      id ? { category_id: product.category_id } : {}
    ).populate("category_id");
    const items = variations.map(async (item) => {
      const data = VariationOption.find({ variation_id: item._id }).then(
        (res) => {
          return {
            [item.name]: res,
          };
        }
      );
      return data;
    });
    const variationArray = await createPromiseAll(items);
    res.json(variationArray);
  }
);

exports.createVariationOption = asyncHandleError(async (req, res, next) => {
  const variationOption = req.body;
  const newVariationOption = await VariationOption.create(variationOption);
  return res.status(201).json(newVariationOption);
});

exports.getVariationOptions = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const variationOptions = await VariationOption.find({
    variation_id: id,
  }).populate("variation_id");
  res.json(variationOptions);
});

exports.getVariationOption = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const variationOption = await VariationOption.findById(id).populate(
    "variation_id"
  );
  if (!variationOption) return next(not_found("Variation Option", id));
  res.json(variationOption);
});

exports.updateVariationOption = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const variation = await VariationOption.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!variation) return next(not_found("Variation option", id));
  res.json(variation);
});

exports.deleteVariationOption = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findVariationOptionItemByProductItem = ProductItem.find({
    variation_option_id: id,
  });
  console.log(findVariationOptionItemByProductItem);
  const checkVariationOption = await createPromiseAll([
    findVariationOptionItemByProductItem,
  ]);

  const variationOption = checkVariationOption.map((item) => item.length);
  if (variationOption.includes(0)) {
    const deleteVariationOption = await VariationOption.findByIdAndDelete(id);
    if (!deleteVariationOption) return next(not_found("Variation option", id));
    return res.json(deleteVariationOption);
  } else {
    return res.status(400).json(`You can't delete variation width ${id}`);
  }
});
