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
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
}, { timestamps: true });

module.exports = uploads = mongoose.model(
    "uploads",
    uploadsSchema
);