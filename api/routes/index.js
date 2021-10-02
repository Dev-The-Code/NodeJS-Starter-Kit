const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Node API");
});

router.get("/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// Buyer API's
router.use("/v1/user", require("./v1/user"));

// Seller API's
router.use("/v1/user", require("./v1/user"));

// Admin API's
router.use("/v1/user", require("./v1/user"));

// Upload files
// router.use("/v1", require("./v1/uploadFile"));

module.exports = router;
