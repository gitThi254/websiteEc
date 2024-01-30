const createPromiseAll = require("../Libs/promise");
const Category = require("../Models/category.model");
const Promotion = require("../Models/promotion.model");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.createPromotion = asyncHandleError(async (req, res, next) => {
  const promotion = req.body;
  const newVariationOption = await Promotion.create(promotion).then(
    async (res) => {
      const data = res.category.map((item) => {
        return Category.findByIdAndUpdate(item, {
          $push: { promotion: res._id },
        });
      });
      createPromiseAll(data);

      return res;
    }
  );
  return res.status(201).json(newVariationOption);
});

exports.getPromotions = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const promotions = await Promotion.find({ category: id }).populate(
    "category"
  );
  res.json(promotions);
});

exports.getPromotionsCalendar = asyncHandleError(async (req, res, next) => {
  const promotions = await Promotion.aggregate([
    { $project: { start: "$start_date", end: "$end_date", title: "$name" } },
    { $sort: { start: 1 } },
  ]);
  res.json(
    promotions.map((item) => {
      return {
        title: item.title,
        start: item.start,
        end: item.end,
      };
    })
  );
});

exports.getPromotion = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const promotion = await Promotion.findById(id).populate("category");
  if (!promotion) return next(not_found("Promotion", id));
  res.json(promotion);
});

exports.updatePromotion = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const promotion = await Promotion.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!promotion) return next(not_found("promotion", id));
  res.json(promotion);
});

exports.deletePromotion = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const findPromotionByCategory = Category.find({
    promotion: id,
  });
  const checkPromotion = await createPromiseAll([findPromotionByCategory]);

  const promotion = checkPromotion.map((item) => item.length);
  if (promotion.includes(0)) {
    const deletePromotion = await Promotion.findByIdAndDelete(id);
    if (!deletePromotion) return next(not_found("Promotion", id));
    return res.json(deletePromotion);
  } else {
    return res.status(400).json(`You can't delete Promotion width ${id}`);
  }
});
