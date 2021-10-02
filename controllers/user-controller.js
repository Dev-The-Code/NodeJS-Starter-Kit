const User = require("../models/User");
const Store = require("../models/Store");
const {
  checkValidation,
  generateHashedPassword,
} = require("../services/utils");
// const forgotaPasswordMail = require("../mailer/forgotPasswordMailer");
const moment = require("moment");

// @Route http://localhost:5000/api/v1/user/signUp/
// @Method POST
// @Desc Add new buyer
exports.signUp = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    // Checking Validation-
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    // Cheking for user if user already exists with email-
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next({
        error:
          "This email is already being used please use a different email address",
        statusCode: 403,
      });
    } else {
      // Creating User
      let newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      await newUser.save();
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error, 'error')
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:5000/api/v1/user/signUp/seller
// @Method POST
// @Desc Add new seller-
exports.signUpSeller = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password, storeName } = req.body;
    // Checking Validation-
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    // Cheking for user if user already exists with email-
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next({
        error:
          "This email is already being used please use a different email address",
        statusCode: 403,
      });
    } else {
      // Checking whether any other user exists with the same phone number
      let existingStore = await Store.findOne({
        storeName,
      });
      if (existingStore) {
        return next({
          error: "Store name in use-Please, select unique store name",
          statusCode: 403,
        });
      } else {
        //   Creating New Company
        let corporateStore = new Store({
          storeName,
        });

        // Creating User
        let newUser = new User({
          firstName,
          lastName,
          email,
          password,
          companyId: corporateStore._id,
          companyName: req.body.companyName,
          role: "seller",
        });

        await corporateStore.save();
        await newUser.save();
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

exports.signUpCorporate = async (req, res, next) => {
  try {
    let {
      fullName,
      storeName,
      storeBased,
      deliveryAddress,
      storeRegistered,
      contactNumber,
      ntn,
      email,
      password,
    } = req.body;
    // Checking Validation-
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    // Cheking for user if user already exists with email-
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next({
        error:
          "This email is already being used please use a different email address",
        statusCode: 403,
      });
    } else {
      // Checking whether any other user exists with the same phone number
      let existingStore = await Store.findOne({
        storeName,
      });
      if (existingStore) {
        return next({
          error: "Store name in use-Please, select unique store name",
          statusCode: 403,
        });
      } else {
        //   Creating New Company
        let corporateStore = new Store({
          storeName,
          storeBased,
          deliveryAddress,
          storeRegistered,
          contactNumber,
          ntn,
        });

        // Creating User
        let newUser = new User({
          fullName,
          email,
          storeId: corporateStore._id,
          storeName: req.body.storeName,
          password,
          role: "buyer",
        });

        await corporateStore.save();
        await newUser.save();
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:5000/api/v1/user/login/
// @Method POST
// @Desc Login User
exports.logIn = async (req, res, next) => {
  try {
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    const isUserExists = await User.findOne({
      email: req.body.email,
    });

    console.log(req.body.email, 'req.body.email');


    if (!isUserExists) {
      return next({
        error: "Invalid email or password",
        statusCode: 400,
      });
    }
    const isCorrectPassword = await isUserExists.verifyPassword(
      req.body.password,
      isUserExists.password
    );
    console.log(isCorrectPassword, 'isCorrectPassword');
    if (!isCorrectPassword) {
      return next({
        error: "Invalid email or password",
        statusCode: 400,
      });
    }

    const token = User.GenerateToken(isUserExists._id);
    res.status(200).json({
      token,
      user: isUserExists,
    });
  } catch (error) {
    console.log(error);
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:5000/api/v1/user/forgetPassword
// @Method POST
// @Desc SEND MAIL TO USER-
exports.forgotPassword = async (req, res, next) => {
  try {
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({
        error: "Couldn't find user",
      });
    } else {
      const token = Math.floor(100000 + Math.random() * 900000);
      user.resetPasswordToken = token;
      user.resetPasswordDuration = new Date(Date.now() + 420000);
      await user.save();
      // await forgotaPasswordMail(user);
      res.status(200).send({
        success: true,
      });
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:5000/api/v1/user/resetPassword/:resetPasswordToken
// @Method POST
// @Desc Reset Password-
exports.resetPassword = async (req, res, next) => {
  try {
    let { token } = req.params;
    let { newPassword, confirmPassword } = req.body;
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }
    if (newPassword !== confirmPassword) {
      return next({
        error: "New password and confirm password must be same",
        statusCode: 400,
      });
    }
    let user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(404).json({
        error: "Couldn't find user",
        statusCode: 400,
      });
    } else {
      if (moment().isBefore(user.resetPasswordDuration)) {
        let hashedPassword = await generateHashedPassword(newPassword);
        user.resetPasswordToken = null;
        user.resetPasswordDuration = null;
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
          success: true,
        });
      } else {
        return next({
          error: "Token expired",
          statusCode: 400,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next({
      error,
      statusCode: 500,
    });
  }
};

// Some new changes
