const path = require("path");
const fs = require("fs");

const fileController = (req, res, next) => {
  const { fileName } = req.params;
  const filePath = `${process.cwd()}/uploads/${fileName}`;

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath, function (err) {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    }
  } catch (error) {
    res.status(404).send({ message: "No such file exists" });
  }
};

module.exports = { fileController };
