const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    req.fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("dc-image-uploader");

const uploadController = (req, res, file) => {
  upload(req, res, function (err) {
    if (err) {
      // Check for multer error
      if (err instanceof multer.MulterError) {
        res.status(400).send({ err: err.message });
      } else {
        res.status(400).send({ err: "Unknown error occured" });
      }
    } else {
      const fullUrl = `${req.protocol}://${req.get("host")}/${
        req.file.filename
      }`;
      res.send({ filePath: fullUrl });
    }
  });
};

module.exports = { uploadController, upload };
