const multer = require("multer");
const { extname, resolve } = require("path");

const imageTypeFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Allowed only .png, .jpg and jpeg"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/storage/images/");
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() +
      Math.round(Math.random() * 1e9) +
      extname(file.originalname).replace("", "");
    cb(null, filename);
  },
});

const uploadProfileImage = multer({
  storage: storage,
  fileFilter: imageTypeFilter,
});

module.exports = uploadProfileImage;
