const express = require("express");
const { Protected } = require("../../../services/jwt");
const uploadController = require("../../../controllers/upload-controller");
const { fileUpload } = require("../../middlewares/file-upload");
const router = express.Router();

// Protected Routes
router.use(Protected);
router.route("/upload").post(
  fileUpload.single("file"),
  uploadController.uploadFile
);

module.exports = router;