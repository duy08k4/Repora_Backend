// Import libraries
const express = require("express")
const loginAccount_Router = express.Router()

// Import controllers
const loginAccount_Controller = require("../../controllers/sharedController/login.controller")

// Import middleware
const userAuthenticate = require("../../middleware/userAuthenticate")
const staffAuthenticate = require("../../middleware/staffAuthenticate")

// Set routes
loginAccount_Router.use("/user-auto", userAuthenticate, loginAccount_Controller.userAutoLogin)
loginAccount_Router.use("/staff-auto", staffAuthenticate, loginAccount_Controller.staffAutoLogin)
loginAccount_Router.use("/", loginAccount_Controller.loginAccount)

module.exports = loginAccount_Router