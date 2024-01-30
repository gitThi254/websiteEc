const { default: mongoose } = require("mongoose");
const createPromiseAll = require("../Libs/promise");
const Cart = require("../Models/cart.model");
const CartItem = require("../Models/cart_item.model");
const Order = require("../Models/order.model");
const OrderLine = require("../Models/order_line");
const OrderStatus = require("../Models/order_status.model");
const PaymentMethod = require("../Models/payment_method.model");
const ShippingMethod = require("../Models/shipping_method.model");
const asyncHandleError = require("../Utils/asyncHandleError");
const ProductItem = require("../Models/product_item.model");

exports.createShippingMethod = asyncHandleError(async (req, res, next) => {
  const newShippingMethod = req.body;
  const shippingMethods = await ShippingMethod.create(newShippingMethod);
  res.status(201).json(shippingMethods);
});

exports.getShippingMethods = asyncHandleError(async (req, res, next) => {
  const shippingMethod = await ShippingMethod.find();
  res.json(shippingMethod);
});

exports.createOrderStatus = asyncHandleError(async (req, res, next) => {
  const newOrderStatus = req.body;
  const orderStatus = await OrderStatus.create(newOrderStatus);
  res.status(201).json(orderStatus);
});

exports.getOrderStatuses = asyncHandleError(async (req, res, next) => {
  const orderStatuses = await OrderStatus.find();
  res.json(orderStatuses);
});

exports.createPaymentMethod = asyncHandleError(async (req, res, next) => {
  const newPaymentMethod = req.body;
  const paymentMethod = await PaymentMethod.create(newPaymentMethod);
  res.status(201).json(paymentMethod);
});

exports.getPaymentMethod = asyncHandleError(async (req, res, next) => {
  const paymentMethods = await PaymentMethod.find();
  res.json(paymentMethods);
});

exports.createOrder = asyncHandleError(async (req, res, next) => {
  const newOrder = req.body;
  const { _id } = req.user;
  const order = await Order.create({ ...newOrder, user_id: _id }).then(
    async (res) => {
      const order_lines = newOrder?.cart?.map((itemOrder) => {
        return CartItem.findById(itemOrder).then(async (item) => {
          return await OrderLine.create({
            product_item_id: item.product_item_id,
            order_id: res._id,
            qty: item.qty,
          });
        });
      });
      const orders = await createPromiseAll(order_lines);
      return orders;
    }
  );
  res.status(201).json(order);
});

exports.getOrders = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const getAllOrders = await Order.aggregate([
    {
      $match: { user_id: new mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "order_lines",
        localField: "order_id",
        foreignField: "_id",
        as: "orderItems",
      },
    },
  ]);
  res.json(getAllOrders);
});

exports.getAllOrders = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const { status, page } = req.query;
  console.log(status, page);
  const getAllOrders = await Order.aggregate([
    {
      $match: { user_id: new mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "order_lines",
        localField: "_id",
        foreignField: "order_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "payment_methods",
        localField: "payment_method_id",
        foreignField: "_id",
        as: "payment_method",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "shipping_address",
        foreignField: "_id",
        as: "address",
      },
    },
    {
      $lookup: {
        from: "shipping_methods",
        localField: "shipping_method",
        foreignField: "_id",
        as: "shipping_method",
      },
    },
    {
      $lookup: {
        from: "order_statuses",
        localField: "order_status",
        foreignField: "_id",
        as: "order_status",
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $unwind: "$address",
    },
    {
      $unwind: "$shipping_method",
    },
    {
      $unwind: "$payment_method",
    },
    {
      $unwind: "$order_status",
    },
    {
      $project: {
        order_date: 1,
        shipping_method: "$shipping_method.name",
        order_total: 1,
        status: "$order_status.status",
        order_id: "$order_status._id",
        qty: "$orderItems.qty",
        product_item: "$orderItems.product_item_id",
        payment_method: "$payment_method.name",
        address: "$address.city",
        createdAt: "$createdAt",
      },
    },
    {
      $match: status
        ? {
            order_id: new mongoose.Types.ObjectId(status),
          }
        : {},
    },
    {
      $group: {
        _id: {
          id: "$_id",
          date: "$order_date",
          order: "$status",
          order_id: "$order_id",
          payment_method: "$payment_method",
          createdAt: "$createdAt",
        },
        item: {
          $push: {
            qty: "$qty",
            product_item: "$product_item",
          },
        },
      },
    },
    {
      $project: {
        id: "$_id.id",
        date: "$_id.date",
        order: "$_id.order",
        order_id: "$_id.order_id",
        payment_method: "$_id.payment_method",
        createdAt: "$_id.createdAt",

        item: 1,
        _id: null,
      },
    },
    {
      $unwind: "$item",
    },
    {
      $lookup: {
        from: "product_items",
        localField: "item.product_item",
        foreignField: "_id",
        as: "product_item",
      },
    },
    {
      $unwind: "$product_item",
    },
    {
      $project: {
        id: 1,
        date: 1,
        total: 1,
        order: 1,
        order_id: 1,
        createdAt: 1,
        product_image: "$product_item.product_image",
        product_id: "$product_item.product_id",
        price: "$product_item.price",
        variation: "$product_item.variation_option_id",
        qty: "$item.qty",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $lookup: {
        from: "variation_options",
        localField: "variation",
        foreignField: "_id",
        as: "variation",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $unwind: "$variation",
    },
    {
      $lookup: {
        from: "categories",
        localField: "product.category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        id: 1,
        date: 1,
        order: 1,
        order_id: 1,
        product_image: 1,
        price: 1,
        qty: 1,
        createdAt: 1,
        value: "$variation.value",
        product_name: "$product.name",
        category_name: "$category.category_name",
      },
    },
    {
      $group: {
        _id: {
          id: "$id",
          date: "$date",
          order: "$order",
          order_id: "$order_id",
          product_image: "$product_image",
          price: "$price",
          qty: "$qty",
          product_name: "$product_name",
          category_name: "$category_name",
          createdAt: "$createdAt",
        },
        value: {
          $push: "$value",
        },
      },
    },
    {
      $project: {
        id: "$_id.id",
        date: "$_id.date",
        order: "$_id.order",
        order_id: "$_id.order_id",
        product_image: "$_id.product_image",
        price: "$_id.price",
        qty: "$_id.qty",
        product_name: "$_id.product_name",
        category_name: "$_id.category_name",
        createdAt: "$_id.createdAt",
        value: 1,
        _id: null,
      },
    },
    {
      $sort: {
        date: -1,
        price: 1,
        value: 1,
        color: 1,
        product_name: -1,
      },
    },
    {
      $skip: (Number(page ? page : 1) - 1) * 5,
    },
    {
      $limit: 5,
    },
  ]);
  const totalPage = await Order.aggregate([
    {
      $match: { user_id: new mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "order_lines",
        localField: "_id",
        foreignField: "order_id",
        as: "orderItems",
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $match: status
        ? {
            order_status: new mongoose.Types.ObjectId(status),
          }
        : {},
    },
    {
      $count: "order_status",
    },
  ]);
  console.log(totalPage);
  res.json({ getAllOrders, totalPage });
});

exports.getAllOrderAdmin = asyncHandleError(async (req, res, next) => {
  const { status, name } = req.query;
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "payment_methods",
        foreignField: "_id",
        localField: "payment_method_id",
        as: "payment_method",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "user_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "payment_methods",
        foreignField: "_id",
        localField: "payment_method_id",
        as: "payment_method",
      },
    },
    {
      $lookup: {
        from: "addresses",
        foreignField: "_id",
        localField: "shipping_address",
        as: "address",
      },
    },
    {
      $lookup: {
        from: "shipping_methods",
        foreignField: "_id",
        localField: "shipping_method",
        as: "shipping",
      },
    },
    {
      $lookup: {
        from: "order_statuses",
        foreignField: "_id",
        localField: "order_status",
        as: "status",
      },
    },
    {
      $lookup: {
        from: "order_lines",
        foreignField: "order_id",
        localField: "_id",
        as: "order_line",
      },
    },
    {
      $unwind: "$order_line",
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$status",
    },
    {
      $unwind: "$shipping",
    },
    {
      $unwind: "$address",
    },
    {
      $unwind: "$payment_method",
    },
    {
      $lookup: {
        from: "product_items",
        foreignField: "_id",
        localField: "order_line.product_item_id",
        as: "product_item",
      },
    },
    {
      $unwind: "$product_item",
    },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "product_item.product_id",
        as: "product",
      },
    },
    {
      $lookup: {
        from: "variation_options",
        foreignField: "_id",
        localField: "product_item.variation_option_id",
        as: "variation",
      },
    },
    {
      $unwind: "$product",
    },

    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "product.category_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 1,
        order_date: 1,
        order_total: 1,
        user: 1,
        payment_method_name: "$payment_method.name",
        address: "$address.city",
        shipping: "$shipping.name",
        shipping_price: "$shipping.price",
        status: "$status.status",
        status_id: "$status._id",
        qty: "$order_line.qty",
        product_name: "$product.name",
        category: "$category.category_name",
        qty_in_stock: "$product_item.qty_in_stock",
        product_image: "$product_item.product_image",
        price: "$product_item.price",
        variation: 1,
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          order_date: "$order_date",
          order_total: "$order_total",
          user: "$user",
          payment_method_name: "$payment_method_name",
          address: "$address",
          shipping: "$shipping",
          shipping_price: "$shipping_price",
          status: "$status",
          status_id: "$status_id",
        },
        product_items: {
          $push: {
            qty: "$qty",
            product_name: "$product_name",
            category: "$category",
            qty_in_stock: "$qty_in_stock",
            product_image: "$product_image",
            price: "$price",
            variation: "$variation",
          },
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        order_date: "$_id.order_date",
        order_total: "$_id.order_total",
        user: "$_id.user",
        payment_method_name: "$_id.payment_method_name",
        address: "$_id.address",
        shipping: "$_id.shipping",
        shipping_price: "$_id.shipping_price",
        status: "$_id.status",
        status_id: "$_id.status_id",
        product_items: 1,
      },
    },
    {
      $addFields: {
        fullname: {
          $concat: ["$user.firstname", " ", "$user.lastname"],
        },
      },
    },
    {
      $match: status
        ? {
            status_id: new mongoose.Types.ObjectId(status),
          }
        : {},
    },
    {
      $match: {
        fullname: { $regex: `.*${name ? name : ""}.*`, $options: "i" },
      },
    },
    {
      $limit: 10,
    },
    {
      $sort: {
        order_date: -1,
      },
    },
  ]);

  res.status(200).json(orders);
});

exports.getOrderAdmin = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;

  const orders = await Order.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "payment_methods",
        foreignField: "_id",
        localField: "payment_method_id",
        as: "payment_method",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "user_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "payment_methods",
        foreignField: "_id",
        localField: "payment_method_id",
        as: "payment_method",
      },
    },
    {
      $lookup: {
        from: "addresses",
        foreignField: "_id",
        localField: "shipping_address",
        as: "address",
      },
    },
    {
      $lookup: {
        from: "shipping_methods",
        foreignField: "_id",
        localField: "shipping_method",
        as: "shipping",
      },
    },
    {
      $lookup: {
        from: "order_statuses",
        foreignField: "_id",
        localField: "order_status",
        as: "status",
      },
    },
    {
      $lookup: {
        from: "order_lines",
        foreignField: "order_id",
        localField: "_id",
        as: "order_line",
      },
    },
    {
      $unwind: "$order_line",
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$status",
    },
    {
      $unwind: "$shipping",
    },
    {
      $unwind: "$address",
    },
    {
      $unwind: "$payment_method",
    },
    {
      $lookup: {
        from: "product_items",
        foreignField: "_id",
        localField: "order_line.product_item_id",
        as: "product_item",
      },
    },
    {
      $unwind: "$product_item",
    },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "product_item.product_id",
        as: "product",
      },
    },
    {
      $lookup: {
        from: "variation_options",
        foreignField: "_id",
        localField: "product_item.variation_option_id",
        as: "variation",
      },
    },
    {
      $unwind: "$product",
    },

    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "product.category_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 1,
        order_date: 1,
        order_total: 1,
        user: 1,
        payment_method_name: "$payment_method.name",
        address: "$address.city",
        shipping: "$shipping.name",
        shipping_price: "$shipping.price",
        status: "$status.status",
        status_id: "$status._id",
        qty: "$order_line.qty",
        product_name: "$product.name",
        category: "$category.category_name",
        qty_in_stock: "$product_item.qty_in_stock",
        product_image: "$product_item.product_image",
        price: "$product_item.price",
        variation: 1,
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          order_date: "$order_date",
          order_total: "$order_total",
          user: "$user",
          payment_method_name: "$payment_method_name",
          address: "$address",
          shipping: "$shipping",
          shipping_price: "$shipping_price",
          status: "$status",
          status_id: "$status_id",
        },
        product_items: {
          $push: {
            qty: "$qty",
            product_name: "$product_name",
            category: "$category",
            qty_in_stock: "$qty_in_stock",
            product_image: "$product_image",
            price: "$price",
            variation: "$variation",
          },
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        order_date: "$_id.order_date",
        order_total: "$_id.order_total",
        user: "$_id.user",
        payment_method_name: "$_id.payment_method_name",
        address: "$_id.address",
        shipping: "$_id.shipping",
        shipping_price: "$_id.shipping_price",
        status: "$_id.status",
        status_id: "$_id.status_id",
        product_items: 1,
      },
    },
  ]);
  // const orders = await Order.findById(id).populate(
  //   "user_id payment_method_id shipping_address shipping_method order_status"
  // );
  res.status(200).json(orders);
});

exports.updateOrder = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    id,
    { order_status: status },
    { new: true }
  ).then(async (res) => {
    if (status === "65a5ec884a4a86cae890b661") {
      await OrderLine.find({ order_id: res?._id })
        .populate("product_item_id")
        .then(async (data) => {
          const order_lines = data.map((item) => {
            return ProductItem.findByIdAndUpdate(
              item?.product_item_id?._id,
              {
                $inc: { qty_in_stock: -item.qty },
              },
              { new: true }
            );
          });
          await createPromiseAll(order_lines);
          return data;
        });
    }

    return res;
  });
  res.json(order);
});

exports.createOrderLine = asyncHandleError(async (req, res, next) => {
  const newOrderLine = req.body;
  const { id } = req.params;

  const orderLine = await OrderLine.create({
    ...newOrderLine,
    order_id: id,
  });
  res.status(201).json(orderLine);
});

exports.getOrderLines = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const orderLines = await OrderLine.find({
    order_id: id,
  }).populate("order_id product_item_id");
  res.json(orderLines);
});
