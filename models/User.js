const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "buyer"
    },
    roleType: {
        type: String,
        default: "individual"
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = async (raw, hashed) => await bcrypt.compare(raw, hashed);

UserSchema.statics.GenerateToken = (id, role) => (jwt.sign({ id, role }, process.env.SECRET_KEY));

module.exports = mongoose.model("users", UserSchema);