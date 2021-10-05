const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const {
    sellerSignUpValidations,
    loginValidations,
    forgotPasswordValidation,
    resetPasswordValidation,
} = require("../../../validations/user-validation");
const { ensureAuthenticated } = require('../../../config/auth');

// Vendor Sign UP
router.route("/signup/seller").post(
    sellerSignUpValidations,
    userController.signUpSeller
);

// User Login
router.route("/login", ensureAuthenticated).post(
    loginValidations, userController.login
);

// User Forget Password
router.route("/forgetPassword").post(
    forgotPasswordValidation,
    userController.forgotPassword
);

// User Reset Password
router.route("/resetPassword/:token").post(
    resetPasswordValidation,
    userController.resetPassword
);

module.exports = router;