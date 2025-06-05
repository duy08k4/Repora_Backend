// Import libraries
const express = require("express")
const user_createAccount_Router = express.Router()

// Import controllers
const user_createAccount_Controller = require("../../controllers/userController/user.createAccount.controller")

// Import middleware

// Set routes
user_createAccount_Router.use("/verify-otp", user_createAccount_Controller.verifyOTP)
user_createAccount_Router.use("/send-otp", user_createAccount_Controller.sendOTP)
user_createAccount_Router.use("/", user_createAccount_Controller.createAccount)

module.exports = user_createAccount_Router