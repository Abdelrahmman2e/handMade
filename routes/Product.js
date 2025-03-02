const express = require("express");
const reviewRouter = require("./Review");

const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  aliasTopProducts,
  uploadProductImages,
  resizeProductImages,
} = require("../controller/productController");

const {
  getProductValidator,
  deleteProductValidator,
  updateProductValidator,
  createProductValidator,
} = require("../utils/validators/productValidator");

const { protect, restrictTo } = require("../controller/authController");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.route("/top-rated").get(aliasTopProducts, getProducts);

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    restrictTo("admin", "artisan"),
    uploadProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    updateProductValidator,
    protect,
    restrictTo("admin", "artisan"),
    uploadProductImages,
    resizeProductImages,
    updateProduct
  )
  .delete(
    deleteProductValidator,
    protect,
    restrictTo("admin", "artisan"),
    deleteProduct
  );

module.exports = router;
