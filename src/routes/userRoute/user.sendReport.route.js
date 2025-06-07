// Import libraries
const express = require("express")
const user_uploadImage_Router = express.Router()

// Import controllers
const user_uploadImage_Controller = require("../../controllers/userController/user.sendReport.controller")
// Import middleware
const userUpload = require("../../middleware/userUpload")

// Set routes
user_uploadImage_Router.use("/", userUpload.single('image') ,user_uploadImage_Controller.uploadImage)

module.exports = user_uploadImage_Router