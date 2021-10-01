const Mongoose = require("mongoose");

const StoreSchema = Mongoose.Schema(
  {
    storeName: String,
    storeBased: String,
    deliveryAddress: String,
    storeRegistered: Date,
    contactNumber: String,
    ntn: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("stores", StoreSchema);
