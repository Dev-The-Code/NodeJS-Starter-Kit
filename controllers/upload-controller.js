const Uploads = require('../models/UploadsModel')

// @Route http://localhost:4000/api/upload/
// @Method POST
// @Desc Upload File
exports.uploadFile = async (req, res, next) => {
  try {
    let upload = new Uploads({
      ...req.file
    });
    upload.save();
    res.status(201).json(upload);
  } catch (error) {
    console.log(error);
    next({
      error,
      statusCode: 500,
    });
  }
};

// // @Route http://localhost:4000/api/upload/multiple
// // @Method POST
// // @Desc Upload File
// exports.uploadFiles = async (req, res, next) => {
//   try {
//     const { multiFiles } = req.body;
//     console.log(req.file);
//     res.status(201).json(req.file);
//   } catch (error) {
//     console.log(error);
//     next({
//       error,
//       statusCode: 500,
//     });
//   }
// };