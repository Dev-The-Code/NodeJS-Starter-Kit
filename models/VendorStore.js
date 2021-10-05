const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      require: true
    },
    storeBased: {
      type: String,
      require: true
    },
    mailingAddress: {
      type: String,
      require: true
    },
    companyRegistered: {
      type: Date,
      require: true,
      default: Date.now()
    },
    phoneNumber: {
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

module.exports = mongoose.model("store", StoreSchema);
