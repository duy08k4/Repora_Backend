// Import libraries
const express = require("express")
const staff_responseDone_Router = express.Router()

// Import controllers
const staff_responseDone_Controller = require("../../controllers/staffController/staff.responseDone.controller")

// Import middleware
const staffAuthorize = require("../../middleware/staffAuthenticate")

// Set routes
staff_responseDone_Router.use("/", staffAuthorize, staff_responseDone_Controller.responseDone)

module.exports = staff_responseDone_Router