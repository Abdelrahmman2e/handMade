const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getUsers = asyncHandler(async (req, res, nxt) => {
  const apiFeature = new ApiFeatures(User.find(), req.query)
    .filter()
    .fieldsLimit()
    .search("User")
    .sort();

  const countDocuments = await User.countDocuments();

  // Apply pagination
  await apiFeature.paginate(countDocuments);
  //Execute Query
  const { mongooseQuery, paginationResult } = apiFeature;
  const users = await mongooseQuery;

  res.status(200).json({
    status: "Success",
    results: users.length,
    paginationResult,
    data: users,
  });
});

exports.createUser = asyncHandler(async (req, res, nxt) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      newUser,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return nxt(new AppError(`No user found with that ID :${id}`, 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.updateUser = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!user) {
    return nxt(new AppError(`No User found with that ID :${id}`, 404));
  }

  res.status(200).json({ status: "Success", data: { user } });
});
exports.deleteUser = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return nxt(new AppError(`No user found with that ID :${id}`, 404));
  }

  res.status(204).send();
});
