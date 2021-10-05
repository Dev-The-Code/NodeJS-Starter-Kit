const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Node API");
});

router.get("/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// Buyer User API's
router.use("/v1/user", require("./v1/user"));

// Seller User API's
router.use("/v2/user", require("./v2/user"));

// Admin User API's
router.use("/v3/user", require("./v3/user"));

// Upload files
// router.use("/v1", require("./v1/uploadFile"));

module.exports = router;
