const { default: mongoose } = require("mongoose");
const createPromiseAll = require("../Libs/promise");
const Order = require("../Models/order.model");
const Product = require("../Models/product.model");
const ProductItem = require("../Models/product_item.model");
const User = require("../Models/user.model");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.analystBasic = asyncHandleError(async (req, res, next) => {
  const Total_Profit = Order.find({
    order_status: "65a5ec884a4a86cae890b661",
  }).then((res) => {
    const sum = res.reduce((item, sum) => item + sum.order_total, 0);
    return sum;
  });
  const total_Product = ProductItem.find().then((res) => {
    const sum = res.reduce((item, sum) => item + sum.qty_in_stock, 0);
    return sum;
  });
  const total_Users = User.countDocuments();
  const result = await createPromiseAll([
    Total_Profit,
    total_Product,
    total_Users,
  ]);
  res.json(result);
});

// db.orders.aggregate([{
//   $group: {
//   _id: {
//     $month: "$order_date"}, total_product_by_month : {$sum : "$order_total"}
// }} , {$project: {month: "$_id", total_product_by_month: 1}}, {$sort: {_id: 1}}])

exports.analystOrder = asyncHandleError(async (req, res, next) => {
  const AnalystOrder = await Order.aggregate([
    {
      $match: {
        order_status: new mongoose.Types.ObjectId("65a5ec884a4a86cae890b661"),
      },
    },
    {
      $group: {
        _id: {
          $month: "$order_date",
        },
        total_product_by_month: { $sum: "$order_total" },
      },
    },
    { $project: { month: "$_id", total_product_by_month: 1 } },
    { $sort: { _id: 1 } },
  ]);

  const AnalystOrder2 = await Order.aggregate([
    {
      $group: {
        _id: {
          $month: "$order_date",
        },
        total_product_by_month: { $sum: "$order_total" },
      },
    },
    { $project: { month: "$_id", total_product_by_month: 1 } },
    { $sort: { _id: 1 } },
  ]);

  let arr3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data1 = AnalystOrder.map((item) => item.total_product_by_month);
  const data2 = AnalystOrder2.map((item) => item.total_product_by_month);

  res.json({
    series: [
      {
        name: "Số lượng sản phẩm đã bán",
        data: data1,
      },
      {
        name: "Tổng doanh thu ước tích",
        data: data2,
      },
      {
        name: "Default",
        data: arr3,
      },
    ],
  });
});

exports.analystOrderOfWeek = asyncHandleError(async (req, res, next) => {
  const AnalystOrder = await Order.aggregate([
    {
      $group: {
        _id: {
          week: { $week: "$order_date" },
          dayOfWeek: { $dayOfWeek: "$order_date" },
        },
        total_product_by_day_of_week: { $sum: "$order_total" },
      },
    },
    { $project: { dayOfWeek: "$_id", total_product_by_day_of_week: 1 } },
    {
      $group: {
        _id: "$_id.week",
        allDay: {
          $push: {
            day: "$_id.dayOfWeek",
            totalPriceOfDay: "$total_product_by_day_of_week",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        allDay: 1,
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const data = AnalystOrder.map((item, i) => {
    let arrays = [0, 0, 0, 0, 0, 0, 0];
    const x = item.allDay.map((x) => x.day);
    const arr = arrays.map((item2, i) => {
      const index = x.indexOf(i + 1);
      if (index !== -1) {
        return item.allDay[index].totalPriceOfDay;
      }
      return 0;
    });
    return {
      name: "sales week-" + item._id,
      data: arr,
      week: item._id,
    };
  });
  res.json(data);
});
