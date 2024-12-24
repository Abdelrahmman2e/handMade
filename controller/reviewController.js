const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

exports.setProductAndUserIdToBody = (req, res, nxt) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  nxt();
};

exports.createReview = asyncHandler(async (req, res, nxt) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    data: newReview,
  });
});

exports.createFilterObj = (req, res, nxt) => {
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };
  req.filterObj = filterObj;
  nxt();
};

exports.getReviews = asyncHandler(async (req, res, nxt) => {
  const reviews = await Review.find(req.filterObj);

  res.status(200).json({
    Results: reviews.length,
    data: reviews,
  });
});

exports.getReview = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return nxt(new AppError(`No review with this Id: ${id}`, 404));
  }
  res.status(200).json({ status: "Success", data: review });
});

exports.updateReview = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const review = await Review.findByIdAndUpdate(
    id,
    {
      review: req.body.review,
      rating: req.body.rating,
    },
    { new: true }
  );

  if (!review) {
    return nxt(new AppError(`No review with this Id: ${id}`, 404));
  }
  res.status(200).json({ status: "Success", data: review });
});

exports.deleteReview = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    return nxt(new AppError(`No review with this Id: ${id}`, 404));
  }
  res.status(204).send();
});
