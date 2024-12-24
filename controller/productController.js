const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");


// @desc     Get a list of products
// @route    GET /api/v1/products
// @access   Public

exports.getProducts = asyncHandler(async (req, res, nxt) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .filter()
    .fieldsLimit()
    .search("Product")
    .sort();

  const countDocuments = await Product.countDocuments();

  // Apply pagination
  await apiFeature.paginate(countDocuments);
  //Execute Query
  const { mongooseQuery, paginationResult } = apiFeature;
  const products = await mongooseQuery;

  res.status(200).json({
    status: "Success",
    results: products.length,
    paginationResult,
    data: products,
  });
});

// @desc    Create Product
// @route   POST  /api/v1/products
// @access  Private/Admin-Artisan
exports.createProduct = asyncHandler(async (req, res, nxt) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "Success",
    data: newProduct,
  });
});

// @desc    Get specific Product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return nxt(new AppError(`No Product found with that ID :${id}`, 404));
  }
  res.status(200).json({
    status: "Success",
    data: product,
  });
});

// @desc    Update specific Product
// @route   PATCH /api/v1/products/:id
// @access  Private/Admin-Artisan
exports.updateProduct = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!product) {
    return nxt(new AppError(`No Product found with that ID :${id}`, 404));
  }

  res.status(200).json({ status: "Success", data: { product } });
});

// @desc    Delete specific Product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return nxt(new AppError(`No Product found with that ID :${id}`, 404));
  }

  res.status(204).send();
});
