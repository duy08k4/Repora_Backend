// Import libraries
const express = require("express")
const admin_login_Router = express.Router()

// Import controllers
const admin_login_Controller = require("../../controllers/adminController/admin.login.controller")

// Import middleware
const adminAuthorize = require("../../middleware/adminAuthenticate")

// Set routes
admin_login_Router.use("/auto", adminAuthorize, admin_login_Controller.autoLogin)
admin_login_Router.use("/", admin_login_Controller.login)

module.exports = admin_login_Router