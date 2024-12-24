const express = require("express");

const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  createFilterObj,
  setCategoryIdToBody,
} = require("../controller/subCategoryController");

const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSUbCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const { protect, restrictTo } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .delete(
    restrictTo("admin", "artisan"),
    deleteSubCategoryValidator,
    deleteSubCategory
  )
  .patch(updateSUbCategoryValidator, updateSubCategory);

module.exports = router;
