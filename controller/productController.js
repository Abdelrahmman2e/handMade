const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const {
  deleteOne,
  updateOne,
  getAll,
  getOne,
  createOne,
} = require("./handlersFactory");

exports.aliasTopProducts = (req, res, nxt) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "title,price,ratingAverage,description";
  nxt();
};

// @desc     Get a list of products
// @route    GET /api/v1/products
// @access   Public

exports.getProducts = getAll(Product, "Product");

// @desc    Create Product
// @route   POST  /api/v1/products
// @access  Private/Admin-Artisan
exports.createProduct = createOne(Product);

// @desc    Get specific Product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = getOne(Product, { path: "reviews" });
// exports.getProduct = asyncHandler(async (req, res, nxt) => {
//   const product = await Product.findById(req.params.id).populate("reviews");
//   res.status(200).json({
//     status: "success",
//     data: {
//       product,
//     },
//   });
// });

// @desc    Update specific Product
// @route   PATCH /api/v1/products/:id
// @access  Private/Admin-Artisan
exports.updateProduct = updateOne(Product);

// @desc    Delete specific Product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = deleteOne(Product);
