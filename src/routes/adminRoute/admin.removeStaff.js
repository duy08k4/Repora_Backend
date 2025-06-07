// Import libraries
const express = require("express")
const admin_removeStaff_Router = express.Router()

// Import controllers
const admin_login_Controller = require("../../controllers/adminController/admin.login.controller")
const admin_removeStaff_Controller = require("../../controllers/adminController/admin.removeStaff.controller")

// Import middleware
const adminAuthorize = require("../../middleware/adminAuthenticate")

// Set routes
admin_removeStaff_Router.use("/", adminAuthorize, admin_removeStaff_Controller.removeStaff)

module.exports = admin_removeStaff_Router