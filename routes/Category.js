const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryController");

const { protect, restrictTo } = require("../controller/authController");

const subCategoryRouter = require("./SubCategory");

const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRouter);

router
  .route("/")
  .post(createCategoryValidator, createCategory)
  .get(protect, getCategories);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .delete(
    deleteCategoryValidator,
    protect,
    restrictTo("admin", "artisan"),
    deleteCategory
  )
  .patch(updateCategoryValidator, updateCategory);

module.exports = router;
