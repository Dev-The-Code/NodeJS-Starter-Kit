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
        type: Date,
        require: true
    },
    defaultAddress: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        default: "Pakistan"
    },
    profilepicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "uploads"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    }
}, { timestamps: true });

module.exports = uploads = mongoose.model(
    "profile",
    profileSchema
);
