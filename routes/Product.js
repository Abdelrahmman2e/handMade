const express = require("express");
const reviewRouter = require("./Review");

const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  aliasTopProducts,
} = require("../controller/productController");

const {
  getProductValidator,
  deleteProductValidator,
  updateProductValidator,
  createProductValidator,
} = require("../utils/validators/productValidator");
const { protect, restrictTo } = require("../controller/authController");

const router = express.Router();

// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3

router.use("/:productId/reviews", reviewRouter);

router.route("/most-popular").get(aliasTopProducts, getProducts);

router
  .route("/")
  .get(getProducts)
  .post(
    createProductValidator,
    protect,
    restrictTo("admin", "artisan"),
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    updateProductValidator,
    protect,
    restrictTo("admin", "artisan"),
    updateProduct
  )
  .delete(
    deleteProductValidator,
    protect,
    restrictTo("admin", "artisan"),
    deleteProduct
  );

module.exports = router;
