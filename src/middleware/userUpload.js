const multer = require("multer")
const storage = multer.memoryStorage(); // dùng memory (buffer) để upload lên Cloudinary
const userUpload = multer({ storage });

module.exports = userUpload