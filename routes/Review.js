const express = require("express");

const {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
  createFilterObj,
  setProductAndUserIdToBody,
} = require("../controller/reviewController");
const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  getReviewsValidator,
} = require("../utils/validators/reviewValidator");

const { protect, restrictTo } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    protect,
    restrictTo("user"),
    setProductAndUserIdToBody,
    createReviewValidator,
    createReview
  )
  .get(createFilterObj, getReviewsValidator, getReviews);
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .patch(updateReviewValidator, updateReview)
  .delete(deleteReviewValidator, deleteReview);

module.exports = router;
