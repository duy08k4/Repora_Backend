// Import libraries
const express = require("express")
const logoutAccount_Router = express.Router()

// Import controllers
const logoutAccount_Controller = require("../../controllers/sharedController/logout.controller")

// Set routes
logoutAccount_Router.use("/", logoutAccount_Controller.logoutAccount)

module.exports = logoutAccount_Router