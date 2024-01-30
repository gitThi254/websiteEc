const { default: mongoose } = require("mongoose");
const Blog = require("../Models/blog.model");
const CustomError = require("../Utils/CustomError");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.createBlog = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const newBlog = req.body;
  const blog = await Blog.create({ ...newBlog, category: id, author: _id });
  res.status(201).json(blog);
});

exports.getBlogs = asyncHandleError(async (req, res, next) => {
  const { title, category, author } = req.query;
  // const blogs = await Blog.find().populate("category author");
  const blogs = await Blog.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "category",
        as: "category_name",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "author",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $unwind: "$category_name",
    },
    {
      $addFields: {
        author: "$author.firstname",
        category_name: "$category_name.category_name",
      },
    },
    {
      $match: {
        title: {
          $regex: `.*${title ? title : ""}.*`,
          $options: "i",
        },
      },
    },
    {
      $match: category
        ? {
            category: new mongoose.Types.ObjectId(category),
          }
        : {},
    },
    {
      $match: {
        author: {
          $regex: `.*${author ? author : ""}.*`,
          $options: "i",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  res.json(blogs);
});

exports.getBlog = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("category author");
  res.json(blog);
});

exports.getBlogUser = asyncHandleError(async (req, res, next) => {
  const getBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { numViews: 1 },
    },
    { new: true }
  ).populate("category author");

  if (!getBlog)
    return next(
      new CustomError(`Blog witth id : ${req.params.id} not found`, 404)
    );
  res.json(getBlog);
});

exports.updateBlog = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const blog = await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("category author");
  res.json(blog);
});

exports.likeBlog = asyncHandleError(async (req, res, next) => {
  const { blogId } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog)
    return next(
      new CustomError(`Blog with id : ${req.body.blogId} not found`, 404)
    );
  const loginUserId = req?.user?._id;
  const isLiked = blog?.isLiked;
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    ).populate("category author");
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    ).populate("category author");
    return res.json({ data: blog });
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    ).populate("category author");
    return res.json(blog);
  }
});

exports.disLikeBlog = asyncHandleError(async (req, res, next) => {
  const { blogId } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog)
    return next(
      new CustomError(`Blog with id : ${req.body.blogId} not found`, 404)
    );
  const loginUserId = req?.user?._id;
  const isDisLiked = blog?.isDisliked;
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    ).populate("category author");
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    ).populate("category author");
    return res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    ).populate("category author");
    return res.json(blog);
  }
});
