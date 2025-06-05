const multer = require("multer")
const storage = multer.memoryStorage(); // dùng memory (buffer) để upload lên Cloudinary
const upload = multer({ storage });

module.exports = upload