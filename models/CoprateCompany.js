const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            require: true
        },
        companyBased: {
            type: String,
            require: true
        },
        deliveryAddress: {
            type: String,
            require: true
        },
        companyRegistered: {
            type: Date,
            require: true,
            default: Date.now()
        },
        contactNumber: {
            type: String,
            require: true
        },
        ntn: {
            type: String,
            require: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("company", CompanySchema);
