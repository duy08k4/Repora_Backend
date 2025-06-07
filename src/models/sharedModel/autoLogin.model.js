// Import libraries
const sha256 = require("js-sha256").sha256
const { v4 } = require("uuid")
const jwt = require("jsonwebtoken");
const ms = require("ms")

// Import database
const db = require("../../config/firebaseSDK")

// Auto login model (USER)
const user_autoLogin_Model = (req, res) => {
    const data = req.dataChecked

    if (data) {
        return res.json({
            status: 200,
            data: {
                mess: "Login successful",
                data: {
                    gmail: data.userGmail_checked,
                    role: data.userRole_checked
                }
            }
        })
    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Please login again"
            }
        })
    }
}

// Auto login model (STAFF)
const staff_autoLogin_Model = (req, res) => {
    const data = req.dataChecked

    if (data) {
        return res.json({
            status: 200,
            data: {
                mess: "Login successful",
                data: {
                    gmail: data.staffGmail_checked,
                    role: data.staffRole_checked
                }
            }
        })
    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Please login again"
            }
        })
    }
}

module.exports = {
    user_autoLogin_Model,
    staff_autoLogin_Model
}