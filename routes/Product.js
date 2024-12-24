const express = require("express");
const reviewRouter = require("./Review");

const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

const {
  getProductValidator,
  deleteProductValidator,
  updateProductValidator,
  createProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use("/:productId/reviews", reviewRouter);

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
