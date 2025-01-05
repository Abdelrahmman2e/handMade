const User = require("../models/userModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/AppError");
const {
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createOne,
} = require("./handlersFactory");

exports.getMe = (req, res, nxt) => {
  req.params.id = req.user.id;
  nxt();
};

exports.getUsers = getAll(User);

exports.createUser = createOne(User);

exports.getUser = getOne(User);

// @desc    Update specific User
// @route   PATCH /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = updateOne(User);

// @desc    Delete specific User
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin

exports.deleteUser = deleteOne(User);

exports.updateMe = asyncHandler(async (req, res, next) => {
  const { name, Phone, email, profile_picture, role, birthDate } = req.body;
  if (name) req.body.slug = slugify(name);
  const doc = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      Phone,
      email,
      profile_picture,
      birthDate,
      role,
    },
    {
      new: true,
    }
  );

  if (!doc) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: doc });
});
