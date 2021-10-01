const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
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
    phoneNumber: {
        type: String,
        require: true
    },
    dob: {
        type: date,
        require: true
    },
    profilepicture: {
        type: mongoose.Types.ObjectId,
        ref: "uploads"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
}, { timestamps: true });

module.exports = uploads = mongoose.model(
    "profile",
    profileSchema
);
