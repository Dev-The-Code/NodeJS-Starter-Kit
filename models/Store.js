const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    storeName: String,
    storeBased: String,
    deliveryAddress: String,
    storeRegistered: Date,
    contactNumber: String,
    ntn: String,
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stores", StoreSchema);
