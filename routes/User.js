const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  deleteMe,
} = require("../controller/authController");

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} = require("../utils/validators/userValidator");

const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.post("/signUp", signUpValidator, signUp);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword/:id", protect, updatePassword);
router.delete("/deleteMe", protect, deleteMe);

router.route("/").post(createUserValidator, createUser).get(getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
