// Import libraries
const express = require("express")
const admin_contact_Router = express.Router()

// Import controllers
const admin_contact_Controller = require("../../controllers/adminController/admin.contact.controller")

// Set routes
admin_contact_Router.use("/", admin_contact_Controller.send)

module.exports = admin_contact_Router