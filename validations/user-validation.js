const { check } = require("express-validator");

exports.signUpValidations = [
  check("firstName").notEmpty().withMessage("Please provide firstName"),
  check("lastName").notEmpty().withMessage("Please provide lastName"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
  check("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long")
];

exports.sellerSignUpValidations = [
  check("firstName").notEmpty().withMessage("Please provide firstName"),
  check("lastName").notEmpty().withMessage("Please provide lastName"),
  check("storeName").notEmpty().withMessage("Please provide store name"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
  check("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long")
];

exports.corporateSignupValidations = [
  check("fullName").notEmpty().withMessage("Please provide person name"),
  check("storeName").notEmpty().withMessage("Please provide store name"),
  check("storeBased").notEmpty().withMessage("Please provide store based"),
  check("deliveryAddress")
    .notEmpty()
    .withMessage("Please provide delivery address"),
  check("storeRegistered")
    .notEmpty()
    .withMessage("Please provide store registered"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Please provide contact number"),
  check("ntn").notEmpty().withMessage("Please provide ntn"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
  check("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long")
];

exports.loginValidations = [
  check("email").isEmail().withMessage("Please provide valid Email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters long")
];

exports.forgotPasswordValidation = [
  check("email").isEmail().withMessage("Please Provide Email"),
];

exports.resetPasswordValidation = [
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be  atleast 8 characters long"),
  check("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Newpassword must be  atleast 8 characters long"),
];