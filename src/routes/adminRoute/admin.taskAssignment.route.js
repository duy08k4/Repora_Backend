// Import libraries
const express = require("express")
const admin_taskAssingment_Router = express.Router()

// Import controllers
const admin_taskAssignment_Controller = require("../../controllers/adminController/admin.taskAssignment.controller")

// Import middleware
const adminAuthorize = require("../../middleware/adminAuthenticate")

// Set routes
admin_taskAssingment_Router.use("/", adminAuthorize, admin_taskAssignment_Controller.assign)

module.exports = admin_taskAssingment_Router