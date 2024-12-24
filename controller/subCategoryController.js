const Subcategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createFilterObj = (req, res, nxt) => {
  let filterObj = {};

  if (req.params.categoryId) filterObj = { category: req.params.categoryId };

  req.filterObj = filterObj;
  nxt();
};

// @desc    Get a list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res, nxt) => {
  // const subCategories = await Subcategory.find(req.filterObj)
  const apiFeature = new ApiFeatures(Subcategory.find(req.filterObj), req.query)
    .filter()
    .fieldsLimit()
    .search("Subcategory")
    .sort();

  const countDocuments = await Subcategory.countDocuments();

  // Apply pagination
  await apiFeature.paginate(countDocuments);
  //Execute Query
  const { mongooseQuery, paginationResult } = apiFeature;
  const subCategories = await mongooseQuery;

  res.status(200).json({
    status: "Success",
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

exports.setCategoryIdToBody = (req, res, nxt) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  nxt();
};

// @desc    Create a new subcategory
// @route   POST /api/v1/subcategories
// @access  Private/Admin-Artisan
exports.createSubCategory = asyncHandler(async (req, res, nxt) => {
  const newSubCategory = await Subcategory.create(req.body);
  res.status(201).json({
    status: "Success",
    data: newSubCategory,
  });
});

// @desc    Get a specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const subCategory = await Subcategory.findById(id);
  if (!subCategory) {
    return nxt(new AppError(`No Subcategory found with that ID :${id}`, 404));
  }
  res.status(200).json({
    status: "Success",
    data: subCategory,
  });
});

// @desc    Update a specific subcategory by id
// @route   PATCH /api/v1/subcategories/:id
// @access  Private/Admin-Artisan
exports.updateSubCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const subCategory = await Subcategory.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!subCategory) {
    return nxt(new AppError(`No Subcategory found with that ID :${id}`, 404));
  }

  res.status(200).json({
    status: "Success",
    data: subCategory,
  });
});
// @desc    Delete a specific subcategory by id
// @route   DELETE /api/v1/subcategories/:id
// @access  Private/Admin-Artisan
exports.deleteSubCategory = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const subCategory = await Subcategory.findByIdAndDelete(id);

  if (!subCategory) {
    return nxt(new AppError(`No Subcategory found with that ID :${id}`, 404));
  }

  res.status(204).send();
});
