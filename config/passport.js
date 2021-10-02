const LocalStartegy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStartegy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "That email is not registered" })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "Password incorect" })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}