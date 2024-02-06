const { default: mongoose } = require("mongoose");
const { not_found } = require("../Errors/err_function");
const createAccessToken = require("../Libs/jwt");
const removeVietnameseTones = require("../Libs/removeVietnameseTones");
const Address = require("../Models/address.model");
const Cart = require("../Models/cart.model");
const Country = require("../Models/country.model");
const User = require("../Models/user.model");
const CustomError = require("../Utils/CustomError");
const asyncHandleError = require("../Utils/asyncHandleError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../Models/nofitication.model");

exports.register = asyncHandleError(async (req, res, next) => {
  const newUser = await User.create(req.body).then(async (res) => {
    await Cart.create({ user_id: res._id });
    return res;
  });
  res.status(201).json(newUser);
});

exports.getNofitications = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const nofitications = await Notification.find({ user_id: _id }).sort(
    "-createdAt"
  );
  res.json(nofitications);
});

exports.resetPassword = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user || !(await user.comparePW(req.body.old_password))) {
    return next(new CustomError("Mật khẩu không chính xác", 401));
  }
  req.body.new_password = await bcrypt.hash(req.body.new_password, 10);
  const userUpdate = await User.findByIdAndUpdate(
    _id,
    {
      password: req.body.new_password,
    },
    { new: true, runValidators: true }
  );
  res.json(userUpdate);
});

exports.login = asyncHandleError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePW(req.body.password))) {
    return next(new CustomError("Incorrect in Email && Password ", 401));
  }
  const token = await createAccessToken({ id: user._id });
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 72 * 60 * 60 * 1000,
  });
  res.json(user);
});

exports.logout = asyncHandleError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new CustomError("No Refresh Token in cookies", 400));
  jwt.verify(token, process.env.SECRET_JWT, async (err, token) => {
    if (err)
      return next(
        new CustomError("Invalid or token expired, you are loggin again", 401)
      );
    let user = await User.findById(token.id);
    if (!user) return next(new CustomError("User not found", 404));
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.sendStatus(204);
  });
});

exports.verifyToken = asyncHandleError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomError("You are not logged in", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, token) => {
    if (err)
      return next(
        new CustomError("Invalid or token expired, you are loggin again", 401)
      );

    let user = await User.findById(token.id).populate(
      "address.default address.address_list"
    );

    if (!user) return next(new CustomError("User not found", 404));
    return res.json(user);
  });
});

exports.getallUser = asyncHandleError(async (req, res, next) => {
  const { role, name, page } = req.query;
  const users = await User.aggregate([
    {
      $match: {},
    },
    {
      $addFields: {
        fullName: {
          $concat: ["$lastname", " ", "$firstname"],
        },
      },
    },
    {
      $match: role
        ? {
            role: role,
          }
        : {},
    },
    {
      $match: {
        fullName: { $regex: `.*${name ? name : ""}.*`, $options: "i" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: (Number(page ? page : 1) - 1) * 5,
    },
    {
      $limit: 5,
    },
  ]);

  const totalPage = await User.aggregate([
    {
      $addFields: {
        fullName: {
          $concat: ["$lastname", " ", "$firstname"],
        },
      },
    },
    {
      $match: role
        ? {
            role: role,
          }
        : {},
    },
    {
      $match: {
        fullName: { $regex: `.*${name ? name : ""}.*`, $options: "i" },
      },
    },
    {
      $count: "totalPage",
    },
  ]);
  res.json({ users, totalPage: totalPage[0]?.totalPage });
});

exports.getUser = asyncHandleError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(not_found("user", user._id));
  res.status(200).json(user);
});

exports.editUser = asyncHandleError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) return next(not_found("user", user._id));
  res.status(200).json(user);
});

exports.deleteUser = asyncHandleError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(not_found("user", user._id));
  res.status(200).json(user);
});

exports.loginAdmin = asyncHandleError(async (req, res, next) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin")
    return next(new CustomError("Not Authorised", 403));
  if (findAdmin && (await findAdmin.comparePW(password))) {
    const token = await createAccessToken({ id: findAdmin?._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json(findAdmin);
  } else {
    return next(new CustomError("Invalid Credentials", 403));
  }
});

exports.createAddress = asyncHandleError(async (req, res, next) => {
  const address = req.body;
  const { _id } = req.user;
  const newAddress = await Address.create({ ...address, users: _id }).then(
    async (res) => {
      await User.findOneAndUpdate(
        _id,
        {
          $push: { "address.address_list": res._id },
        },
        {
          new: true,
          runValidators: true,
        }
      ).then(async (data) => {
        if (!data.address.default) {
          await User.findOneAndUpdate(
            _id,
            { $set: { "address.default": res._id } },
            { new: true, runValidators: true }
          );
        }
      });
      return res;
    }
  );
  res.status(201).json(newAddress);
});

exports.updateAddress = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const address = await Address.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!address) return next(not_found("address", id));
  res.status(200).json(address);
});

exports.deleteAddress = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const address = await Address.findByIdAndDelete(id).then(async (res) => {
    await User.findById(_id).then(async (data) => {
      if (data?.address?.default.toString() === res._id.toString()) {
        await User.findOneAndUpdate(_id, {
          $pull: { "address.address_list": res._id },
          "address.default": null,
        });
      } else {
        await User.findOneAndUpdate(_id, {
          $pull: { "address.address_list": res._id },
        });
      }
      return data;
    });
    return res;
  });
  if (!address) return next(not_found("address", id));

  res.status(200).json(address);
});

exports.getAddress = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const address = await Address.findById(id);
  if (!address) return next(not_found("address", id));
  res.status(200).json(address);
});

exports.getAddresses = asyncHandleError(async (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);
  const countries = await Address.find({ users: _id }).sort("-createdAt");
  res.status(200).json(countries);
});

exports.createCountry = asyncHandleError(async (req, res, next) => {
  const country = req.body;
  const newCountry = await Country.create(country);
  res.status(201).json(newCountry);
});

exports.getCountries = asyncHandleError(async (req, res, next) => {
  const countries = await Country.find();
  res.status(200).json(countries);
});
