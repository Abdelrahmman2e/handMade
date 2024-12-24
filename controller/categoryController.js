const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

// @desc     Get a list of categories
// @route    GET /api/v1/categories
// @access   Public
exports.getCategories = asyncHandler(async (req, res, nxt) => {
  const apiFeature = new ApiFeatures(Category.find(), req.query)
    .filter()
    .fieldsLimit()
    .search("Category")
    .sort();

  const countDocuments = await Category.countDocuments();

  // Apply pagination
  await apiFeature.paginate(countDocuments);
  //Execute Query
  const { mongooseQuery, paginationResult } = apiFeature;
  const categories = await mongooseQuery;

  res.status(200).json({
    status: "Success",
    results: categories.length,
    paginationResult,
    data: categories,
  });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private/Admin-Artisan
exports.createCategory = asyncHandler(async (req, res, nxt) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: "Success",
    data: newCategory,
  });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return nxt(new AppError(`No category found with that ID :${id}`, 404));
  }
  res.status(200).json({
    status: "Success",
    data: category,
  });
});

// @desc    Update specific category
// @route   PATCH /api/v1/categories/:id
// @access  Private/Admin-Artisan
exports.updateCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) {
    return nxt(new AppError(`No category found with that ID :${id}`, 404));
  }

  res.status(200).json({ status: "Success", data: { category } });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return nxt(new AppError(`No category found with that ID :${id}`, 404));
  }

  res.status(204).send();
});
