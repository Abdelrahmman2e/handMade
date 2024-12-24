const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const slugify = require("slugify");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  validatorMW,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  check("name")
    .notEmpty()
    .withMessage("User name is required..!!")
    .isLength({ min: 3 })
    .withMessage("User name is very short..!!")
    .isLength({ max: 32 })
    .withMessage("User name is very long..!!")
    .custom((val, { req }) => (req.body.slug = slugify(val))),
  validatorMW,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid ID format..!!"),
  validatorMW,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required..!!")
    .isLength({ min: 3 })
    .withMessage("User name is very short..!!")
    .isLength({ max: 32 })
    .withMessage("User name is very long..!!")
    .custom((val, { req }) => (req.body.slug = slugify(val))),
  check("email")
    .notEmpty()
    .withMessage("E-mail is required..!!")
    .isEmail()
    .withMessage("Invalid email format..!!"),
  check("photo").optional(),
  check("password")
    .notEmpty()
    .withMessage("Password is required..!!")
    .isLength({ min: 3 })
    .withMessage("Password must be over 8 characters..!!")
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match..!!");
      }
      return true;
    }),
  validatorMW,
];