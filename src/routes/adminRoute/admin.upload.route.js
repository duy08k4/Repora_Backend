// Import libraries
const express = require("express")
const admin_uploadImage_Router = express.Router()

// Import controllers
const admin_uploadImage_Controller = require("../../controllers/adminController/admin.upload.controller")

// Import middleware
const upload = require("../../middleware/adminUpload")

// Set routes
admin_uploadImage_Router.use("/", upload.single('image') ,admin_uploadImage_Controller.uploadImage)

module.exports = admin_uploadImage_Router