const mongoose = require("mongoose");

const uploadsSchema = mongoose.Schema({
    mimetype: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    originalname: {
        type: String,
        require: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    },
}, { timestamps: true });

module.exports = uploads = mongoose.model(
    "uploads",
    uploadsSchema
);