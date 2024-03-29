const { default: mongoose } = require("mongoose");
const Cart = require("../Models/cart.model");
const CartItem = require("../Models/cart_item.model");
const asyncHandleError = require("../Utils/asyncHandleError");
const ProductItem = require("../Models/product_item.model");
const { not_found } = require("../Errors/err_function");
const Notification = require("../Models/nofitication.model");

exports.createCart = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const newCart = await Cart.create({ user_id: _id });
  return res.status(201).json(newCart);
});

exports.getCarts = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const Carts = await Cart.find({ user_id: _id });
  res.json(Carts);
});

exports.createCartItem = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const { cartId } = req.params;
  const cartItem = req.body;

  const findProduct = await CartItem.findOne({
    cart_id: cartId,
    product_item_id: cartItem.product_item_id,
  });
  if (!findProduct) {
    const newCartItem = await CartItem.create({
      ...cartItem,
      cart_id: cartId,
    }).then(async (res) => {
      await Notification.create({
        title: "Thêm sản phẩm vào giỏ hàng",
        content: `Bạn đã thêm ${req.body.product_name} vào giỏ hàng thành công`,
        user_id: _id,
      });
      return res;
    });
    return res.status(201).json(newCartItem);
  } else {
    const newCartItem = await CartItem.findByIdAndUpdate(
      findProduct._id,
      {
        $inc: { qty: cartItem.qty },
      },
      { new: true }
    );
    return res.status(200).json(newCartItem);
  }
});

exports.updateCart = asyncHandleError(async (req, res, next) => {
  const { cartId } = req.params;
  const cartItem = req.body;
  const newCartItem = await CartItem.findByIdAndUpdate(cartId, cartItem);
  if (!newCartItem) return next(not_found("cart", cartId));
  return res.status(200).json(newCartItem);
});

exports.deleteCart = asyncHandleError(async (req, res, next) => {
  const { cartId } = req.params;
  const deleteCartItem = await CartItem.findByIdAndDelete(cartId);
  if (!deleteCartItem) return next(not_found("cart", cartId));
  return res.status(200).json(deleteCartItem);
});

exports.getCartItems = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const carts = await Cart.find({ user_id: _id }).then(async (res) => {
    const CartItems = await CartItem.aggregate([
      {
        $match: { cart_id: new mongoose.Types.ObjectId(res[0]?._id) },
      },
      {
        $lookup: {
          from: "product_items",
          localField: "product_item_id",
          foreignField: "_id",
          as: "product_items",
        },
      },
      { $unwind: "$product_items" },
      {
        $lookup: {
          from: "products",
          localField: "product_items.product_id",
          foreignField: "_id",
          as: "products",
        },
      },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "categories",
          localField: "products.category_id",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
      {
        $lookup: {
          from: "variation_options",
          localField: "product_items.variation_option_id",
          foreignField: "_id",
          as: "variations_option",
        },
      },
      {
        $project: {
          _id: 1,
          cart_id: 1,
          product_item_id: 1,
          qty: 1,
          createdAt: 1,
          updatedAt: 1,
          sku: "$product_items.SKU",
          product_image: "$product_items.product_image",
          price: "$product_items.price",
          name: "$products.name",
          description: "$product.decription",
          category: "$categories.category_name",
          variation_options: "$variations_option.value",
        },
      },
    ]);
    return CartItems;
  });

  res.json(carts);
});
