// Import libraries
const express = require("express")
const staff_taskResponse_Router = express.Router()

// Import controllers
const staff_taskResponse_Controller = require("../../controllers/staffController/staff.taskResponse.controller")

// Import middleware
const staffAuthorize = require("../../middleware/staffAuthenticate")

// Set routes
staff_taskResponse_Router.use("/", staffAuthorize, staff_taskResponse_Controller.taskResponse)

module.exports = staff_taskResponse_Router