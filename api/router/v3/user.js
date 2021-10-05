const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const {
    loginValidations,
} = require("../../../validations/user-validation");
const { ensureAuthenticated } = require('../../../config/auth');

// Admin Login
router.route("/login", ensureAuthenticated).post(loginValidations, userController.login);

module.exports = router;