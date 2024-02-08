const { default: mongoose } = require("mongoose");
const Blog = require("../Models/blog.model");
const CustomError = require("../Utils/CustomError");
const asyncHandleError = require("../Utils/asyncHandleError");

function generateRandomBlog() {
  const title = ["Xuân", "Hạ", "Thu", "Đông"];
  const randomTitle =
    title[Math.floor(Math.random() * title.length)] +
    Math.floor(Math.random() * 1000000);

  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eum odio et voluptatem accusantium doloribus eligendi laudantium nostrum nemo quia amet sequi, ad voluptatum? Ea eius tempora aliquam earum quae.";
  const randomImages = [
    {
      public_id: "yxahex96hbgv0u2qbmrk",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1707184719/yxahex96hbgv0u2qbmrk.jpg",
      asset_id: "81b746d69341c65f6262bb6e56094b19",
    },
    {
      public_id: "o6cemy8gno1c4hsz6qjr",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1706849121/o6cemy8gno1c4hsz6qjr.jpg",
      asset_id: "bdd2db6ffeea29b1559d343118f83a0e",
    },
    {
      public_id: "esyvb8kt3fo6ygni3bvt",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1706614151/esyvb8kt3fo6ygni3bvt.jpg",
      asset_id: "0efc28804566f423b59b7139cc86d6ef",
      _id: "65b8dd8ac77f0d520ed9d60e",
    },
    {
      public_id: "hsvgxipnz1uyv7ey7iou",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1706610812/hsvgxipnz1uyv7ey7iou.jpg",
      asset_id: "f51a42da87a6c718a256251b5f6f8633",
      _id: "65b8d082c77f0d520ed9d1e4",
    },
    {
      public_id: "xylwm6ggr8rqcpkzuhh5",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1706610758/xylwm6ggr8rqcpkzuhh5.jpg",
      asset_id: "90e3d06ec3a4c1bc2a48589c0e9badf5",
      _id: "65b8d048c77f0d520ed9d1d5",
    },
    {
      public_id: "geceqdwvfxhx9bqiyzxe",
      url: "https://res.cloudinary.com/dshyra0lz/image/upload/v1706610689/geceqdwvfxhx9bqiyzxe.jpg",
      asset_id: "7bfe60b4402c808f2cbf395b2514c31c",
      _id: "65b8d012c77f0d520ed9d1c0",
    },
  ];

  const images = randomImages[Math.floor(Math.random() * randomImages.length)];
  return {
    title: randomTitle,
    description: description,
    images: images,
  };
}

exports.insertBlogMany = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const randomBlogs = [];
  for (let i = 0; i < 10000; i++) {
    randomBlogs.push({ ...generateRandomBlog(), category: id, author: _id });
  }
  const blogs = await Blog.insertMany(randomBlogs);

  res.json(blogs);
});

exports.deleteBlogMany = asyncHandleError(async (req, res, next) => {
  const blogs = await Blog.deleteMany({ title: { $regex: /10000/ } });
  res.json(blogs);
});

exports.createBlog = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const newBlog = req.body;
  const blog = await Blog.create({ ...newBlog, category: id, author: _id });
  res.status(201).json(blog);
});

exports.getBlogs = asyncHandleError(async (req, res, next) => {
  const { title, category, author, page, limit } = req.query;
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
      $unwind: { preserveNullAndEmptyArrays: true, path: "$author" },
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
      $facet: {
        data: [
          {
            $sort: {
              createdAt: -1,
              category: -1,
            },
          },
          {
            $skip: (Number(page ? page : 1) - 1) * Number(limit ?? 5),
          },

          {
            $limit: Number(limit) ? Number(limit) : 6,
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
    data: blogs[0].data,
    totalPage: blogs[0]?.totalPage[0]?.total ?? 0,
  });
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
