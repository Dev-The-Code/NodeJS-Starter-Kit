const User = require("../models/User");
const Profile = require("../models/Profile");
const Store = require("../models/VendorStore");
const Company = require('../models/CoprateCompany');
const {
  checkValidation,
  generateHashedPassword,
} = require("../services/utils");
const forgotaPasswordMail = require("../mailer/mailer");
const moment = require("moment");

// @Route http://localhost:4000/api/v1/user/signUp/
// @Method POST
// @Desc Add new buyer of Individual User
exports.buyerSignUp = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    // Checking Validation-
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }

    // Cheking for user if user already exists with email
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next({
        error:
          "This email is already registered, please use a different email.",
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

      // Creating User Profile
      let profile = new Profile({
        firstName,
        lastName,
        email,
        password,
        userId: newUser._id
      })

      // Save data in Collections
      await profile.save();
      await newUser.save();

      res.status(200).json({
        success: true,
        msg: "You have been register successfully."
      });
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:4000/api/v1/user/signUp/corporate
// @Method POST
// @Desc Add new buyer of Individual User
exports.signUpCorporate = async (req, res, next) => {
  try {
    let {
      firstName,
      lastName,
      companyName,
      companyBased,
      deliveryAddress,
      companyRegistered,
      phoneNumber,
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
          "This email is already registered, please use a different email.",
        statusCode: 403,
      });
    } else {

      // Checking whether any other user exists with the same company
      let existingCompany = await Company.findOne({
        companyName,
      });
      if (existingCompany) {
        return next({
          error: "This Company is already registered, please use a different company.",
          statusCode: 403,
        });
      } else {

        // Creating User
        let newUser = new User({
          firstName,
          lastName,
          email,
          password,
          role: "buyer",
          roleType: "corporate"
        });

        //   Creating Corporate Company
        let corporateCompany = new Company({
          companyName,
          companyBased,
          deliveryAddress,
          companyRegistered,
          phoneNumber,
          ntn,
          email,
          userId: newUser._id,
        });

        // Creating User Profile
        let profile = new Profile({
          firstName,
          lastName,
          email,
          password,
          userId: newUser._id,
          companyId: corporateCompany._id
        })

        await newUser.save();
        await corporateCompany.save();
        await profile.save();

        res.status(200).json({
          success: true,
          msg: "You have been register as a corporate user successfully."
        });
      }
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:4000/api/v1/user/signUp/seller
// @Method POST
// @Desc Add new seller-
exports.signUpSeller = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password, storeName, storeBased, mailingAddress, storeRegistered, phoneNumber } = req.body;

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
          "This email is already registered, please use a different email.",
        statusCode: 403,
      });
    } else {

      // Checking whether any other user exists with the same store
      let existingStore = await Store.findOne({
        storeName,
      });

      if (existingStore) {
        return next({
          error: "This Store is already registered, please use a different store.",
          statusCode: 403,
        });
      } else {

        // Creating User
        let newUser = new User({
          firstName,
          lastName,
          email,
          password,
          role: "seller",
          roleType: "vendor"
        });

        //   Creating New Store
        let vendorStore = new Store({
          storeName,
          userId: newUser._id,
        });

        // Creating User Profile
        let profile = new Profile({
          firstName,
          lastName,
          email,
          password,
          userId: newUser._id,
          storeId: vendorStore._id
        })

        await newUser.save();
        await vendorStore.save();
        await profile.save();

        res.status(200).json({
          success: true,
          msg: "You have been register as a corporate user successfully."
        });
      }
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:4000/api/v1/user/login/
// @Method POST
// @Desc Login User
exports.login = async (req, res, next) => {
  try {

    // Checking Validation-
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }

    // Find the user is exits/
    const isUserExists = await User.findOne({
      email: req.body.email,
    });

    // User not found returns
    if (!isUserExists) {
      return next({
        error: "Invalid email or password",
        statusCode: 400,
      });
    }

    // Check password valid
    const isCorrectPassword = await isUserExists.verifyPassword(
      req.body.password,
      isUserExists.password
    );

    // Password does not matched
    if (!isCorrectPassword) {
      return next({
        error: "Invalid email or password",
        statusCode: 400,
      });
    }

    // Genrate JWT token for secure the API's
    const token = User.GenerateToken(isUserExists._id);

    res.status(200).json({
      token,
      user: isUserExists,
    });
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:4000/api/v1/user/forgetPassword
// @Method POST
// @Desc SEND MAIL TO USER FOR RESET THE PASSWORD-
exports.forgotPassword = async (req, res, next) => {
  try {

    // Check Validations
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }

    // User find
    const user = await User.findOne({
      email: req.body.email,
    });

    // User Not Found
    if (!user) {
      res.status(404).json({
        error: "Couldn't find user",
      });
    } else {

      // Genrate The Token for Reset Password
      const token = Math.floor(100000 + Math.random() * 900000);

      // Attached the token code
      user.resetPasswordToken = token;
      // user.resetPasswordDuration = new Date(Date.now() + 420000);

      await user.save();
      await forgotaPasswordMail(user);
      res.status(200).send({
        success: true,
        msg: "Kindly check your email & click the given link for reset password"
      });
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};

// @Route http://localhost:4000/api/v1/user/resetPassword/:resetPasswordToken
// @Method POST
// @Desc Reset Password-
exports.resetPassword = async (req, res, next) => {
  try {
    let { token } = req.params;
    let { newPassword, confirmPassword } = req.body;

    // Check Validation
    let errors = checkValidation(req);
    if (errors) {
      return next(errors);
    }

    // Matched Password 
    if (newPassword !== confirmPassword) {
      return next({
        error: "New password and confirm password must be same",
        statusCode: 400,
      });
    }

    // Find User by rest password token
    let user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(404).json({
        error: "Couldn't find token",
        statusCode: 400,
      });
    } else {

      // if (moment().isBefore(user.resetPasswordDuration)) {
      user.resetPasswordToken = null;
      // user.resetPasswordDuration = null;
      user.password = newPassword;

      // User data save in DB
      await user.save();
      res.status(200).json({
        success: true,
        msg: "Your Password has been Changed Successfully"
      });

      // } else {
      //   return next({
      //     error: "Token expired",
      //     statusCode: 400,
      //   });
      // }
    }
  } catch (error) {
    next({
      error,
      statusCode: 500,
    });
  }
};