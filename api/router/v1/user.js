const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const {
    signUpValidations,
    loginValidations,
    forgotPasswordValidation,
    resetPasswordValidation,
    corporateSignupValidations,
} = require("../../../validations/user-validation");
const { ensureAuthenticated } = require('../../../config/auth');

// // Login
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

// // Logout Handloe
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash("success_msg", "You are logged out");
//     res.redirect("/users/login")
// })

// Individual user Sign UP
router.route("/signup").post(signUpValidations, userController.signUp);

// Corporate user Sign UP
router.route("/signup/corporate").post(
    corporateSignupValidations,
    userController.signUpCorporate
);

// User Login
router.route("/login", ensureAuthenticated).post(loginValidations, userController.logIn);

// User Forget Password
router.route("/forgetPassword").post(
    forgotPasswordValidation,
    userController.forgotPassword
);

// Reset Password
router.route("/resetPassword/:token").post(
    resetPasswordValidation,
    userController.resetPassword
);

module.exports = router;