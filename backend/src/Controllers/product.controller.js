const { default: mongoose } = require("mongoose");
const { not_found } = require("../Errors/err_function");
const createPromiseAll = require("../Libs/promise");
const Product = require("../Models/product.model");
const ProductItem = require("../Models/product_item.model");
const VariationOption = require("../Models/variation_option.model");
const asyncHandleError = require("../Utils/asyncHandleError");
const removeVietnameseTones = require("../Libs/removeVietnameseTones");

// db.product_items.aggregate([{$group: {_id: "$product_id", min: {$min: "$price"}, max: {$max: "$price"}}}])

exports.createProduct = asyncHandleError(async (req, res, next) => {
  const data = req.body;
  if (data.name) {
    const nameSearch = removeVietnameseTones(data.name);
    data.nameSearch = nameSearch;
  }
  const newProduct = await Product.create(data);
  return res.status(201).json(newProduct);
});

exports.getProducts = asyncHandleError(async (req, res, next) => {
  const { name, category, price, page } = req.query;
  console.log({ name, category, price, page });
  const search = name ? removeVietnameseTones(name) : undefined;
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "product_items",
        localField: "_id",
        foreignField: "product_id",
        as: "product_items",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_id",
      },
    },
    {
      $unwind: { preserveNullAndEmptyArrays: true, path: "$product_items" },
    },
    {
      $group: {
        _id: {
          id: "$_id",
          name: "$name",
          description: "$description",
          image: "$product_image",
          category: "$category_id",
          search: "$nameSearch",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
        minPrice: { $min: "$product_items.price" },
        maxPrice: { $max: "$product_items.price" },
        sumProducts: { $sum: "$product_items.qty_in_stock" },
      },
    },
    {
      $project: {
        id: "$_id.id",
        name: "$_id.name",
        description: "$_id.description",
        image: "$_id.image",
        search: "$_id.search",
        category: "$_id.category",
        updatedAt: "$_id.updatedAt",
        createdAt: "$_id.createdAt",
        min: "$minPrice",
        max: "$maxPrice",
        count: "$sumProducts",
        _id: null,
      },
    },

    {
      $addFields: {
        category_id: "$category._id",
      },
    },
    {
      $unwind: "$category_id",
    },
    {
      $match: {
        search: {
          $regex: `.*${search ? search : ""}.*`,
          $options: "i",
        },
      },
    },
    {
      $match: category
        ? {
            category_id: new mongoose.Types.ObjectId(category),
          }
        : {},
    },
    {
      $sort: price ? { min: Number(price) } : { createdAt: -1 },
    },
    {
      $skip: (Number(page ? page : 1) - 1) * 6,
    },
    {
      $limit: 6,
    },
  ]);
  const totalPage = await Product.countDocuments({
    nameSearch: {
      $regex: `.*${search ? search : ""}.*`,
      $options: "i",
    },
  });
  res.json({ products, totalPage });
});

exports.getProductDetail = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "product_items",
        localField: "_id",
        foreignField: "product_id",
        as: "product_items",
      },
    },
    {
      $unwind: "$product_items",
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        product_image: 1,
        category_id: 1,
        product_item_id: "$product_items._id",
        sku: "$product_items.SKU",
        qty_in_stock: "$product_items.qty_in_stock",
        price: "$product_items.price",
        product_image_items: "$product_items.product_image",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "variation_options",
        localField: "product_item_id",
        foreignField: "product_item_id",
        as: "variation_options",
      },
    },
    {
      $unwind: "$variation_options",
    },
    {
      $project: {
        id: "$_id",
        name: 1,
        description: 1,
        product_image: 1,
        product_item_id: 1,
        product_image_items: 1,
        category_name: "$category.category_name",
        sku: 1,
        qty_in_stock: 1,
        price: 1,
        variation_id: "$variation_options.variation_id",
        value: "$variation_options.value",
        _id: null,
      },
    },
    {
      $lookup: {
        from: "variations",
        localField: "variation_id",
        foreignField: "_id",
        as: "variation",
      },
    },
    {
      $unwind: "$variation",
    },
    {
      $project: {
        id: 1,
        name: 1,
        description: 1,
        product_image: 1,
        product_item_id: 1,
        product_image_items: 1,
        category_name: "$category.category_name",
        sku: 1,
        qty_in_stock: 1,
        price: 1,
        variation_name: "$variation.name",
        value: "$value",
        _id: null,
      },
    },
    {
      $group: {
        _id: {
          id: "$id",
          name: "$name",
          description: "$description",
          product_image: "$product_image",
          category_name: "$category.category_name",
          product_item_id: "$product_item_id",
          product_image_items: "$product_image_items",
          sku: "$sku",
          qty_in_stock: "$qty_in_stock",
          price: "$price",
        },
        variation_options: {
          $push: {
            variation_name: "$variation_name",
            value: "$value",
          },
        },
      },
    },
    {
      $project: {
        id: "$_id.id",
        name: "$_id.name",
        description: "$_id.description",
        product_image: "$_id.product_image",
        product_item_id: "$_id.product_item_id",
        product_image_items: "$_id.product_image_items",
        category_name: "$_id.category_name",
        sku: "$_id.sku",
        qty_in_stock: "$_id.qty_in_stock",
        price: "$_id.price",
        variation_options: 1,
        _id: null,
      },
    },
    { $sort: { sku: 1 } },
    {
      $group: {
        _id: {
          id: "$id",
          name: "$name",
          description: "$description",
          product_image: "$product_image",
          category_name: "$category_name",
        },
        product_items: {
          $push: {
            product_item_id: "$product_item_id",
            product_image_items: "$product_image_items",
            sku: "$sku",
            price: "$price",
            qty_in_stock: "$qty_in_stock",
            variations: "$variation_options",
          },
        },
      },
    },
    {
      $project: {
        id: "$_id.id",
        name: "$_id.name",
        description: "$_id.description",
        product_image: "$_id.product_image",
        category_name: "$_id.category_name",
        product_items: 1,
        _id: null,
      },
    },
  ]);

  if (!product) return next(not_found("Product", id));
  res.json(product);
});
exports.getProduct = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category_id");
  if (!product) return next(not_found("Product", id));
  res.json(product);
});

exports.updateProduct = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  if (data.name) {
    const nameSearch = removeVietnameseTones(data.name);
    data.nameSearch = nameSearch;
  }
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(not_found("Product", id));
  res.json(product);
});

exports.deleteProduct = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findProductByProductItem = ProductItem.find({ product_id: id });
  const checkProduct = await createPromiseAll([findProductByProductItem]);

  const product = checkProduct.map((item) => item.length);

  if (product.includes(0)) {
    const deleteproduct = await Product.findByIdAndDelete(id);
    if (!product) return next(not_found("product", id));
    return res.json(deleteproduct);
  } else {
    return res.status(400).json(`You can't delete product width ${id}`);
  }
});

exports.createProductItem = asyncHandleError(async (req, res, next) => {
  const productItem = req.body;
  const { id } = req.params;
  const newProductItem = await ProductItem.create({
    ...productItem,
    product_id: id,
  }).then(async (data) => {
    data.variation_option_id.forEach(async (element) => {
      await VariationOption.findByIdAndUpdate(
        element,
        {
          $push: { product_item_id: data._id },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    });
    return data;
  });
  return res.status(201).json(newProductItem);
});

exports.getProductItems = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const productItems = await ProductItem.find({ product_id: id }).populate(
    "product_id variation_option_id"
  );

  res.json(productItems);
});

exports.getProductItem = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductItem.findById(id);
  if (!product) return next(not_found("Product", id));
  res.json(product);
});

exports.updateProductItem = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const product = await ProductItem.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(not_found("Product item", id));
  res.json(product);
});

exports.deleteProductItem = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findProductItemByVariation = VariationOption.find({
    product_item_id: id,
  });
  const checkProductItem = await createPromiseAll([findProductItemByVariation]);

  const product = checkProductItem.map((item) => item.length);

  if (product.includes(0)) {
    const deleteproductItem = await ProductItem.findByIdAndDelete(id);
    if (!deleteproductItem) return next(not_found("product item", id));
    return res.json(deleteproductItem);
  } else {
    return res.status(400).json(`You can't delete product item width ${id}`);
  }
});
