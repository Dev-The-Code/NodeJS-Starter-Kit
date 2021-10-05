const { check } = require("express-validator");

exports.buyerSignUpValidations = [
  check("firstName").notEmpty().withMessage("Please provide firstName"),
  check("lastName").notEmpty().withMessage("Please provide lastName"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 4 to 16 charcters").custom(async (confirmPassword, { req }) => {
      const password = req.body.password

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== confirmPassword) {
        throw new Error('Passwords must be same')
      }
    }),
];


exports.corporateSignupValidations = [
  check("firstName").notEmpty().withMessage("Please provide firstName"),
  check("lastName").notEmpty().withMessage("Please provide lastName"),
  check("companyName").notEmpty().withMessage("Please provide store name"),
  check("companyBased").notEmpty().withMessage("Please provide store based"),
  check("deliveryAddress")
    .notEmpty()
    .withMessage("Please provide delivery address"),
  check("companyRegistered")
    .notEmpty()
    .withMessage("Please provide store registered"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Please provide phone number"),
  check("ntn").notEmpty().withMessage("Please provide ntn"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 4 to 16 charcters").custom(async (confirmPassword, { req }) => {
      const password = req.body.password

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== confirmPassword) {
        throw new Error('Passwords must be same')
      }
    }),
];

exports.sellerSignUpValidations = [
  check("firstName").notEmpty().withMessage("Please provide firstName"),
  check("lastName").notEmpty().withMessage("Please provide lastName"),
  check("storeName").notEmpty().withMessage("Please provide store name"),
  check("email").isEmail().withMessage("Please provide valid email"),
  check("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 4 to 16 charcters").custom(async (confirmPassword, { req }) => {
      const password = req.body.password

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== confirmPassword) {
        throw new Error('Passwords must be same')
      }
    }),
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
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 4 to 16 charcters").custom(async (confirmPassword, { req }) => {
      const newPassword = req.body.newPassword

      // If newPassword and confirm newPassword not same
      // don't allow to sign up and throw error
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords must be same')
      }
    }),
];