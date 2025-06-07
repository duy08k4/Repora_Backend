// Import database
const db = require("../config/firebaseSDK")

// Import admin routes
const admin_login_Router = require("./adminRoute/admin.login.route")
const admin_uploadImage_Router = require("./adminRoute/admin.upload.route")
const admin_removeStaff_Router = require("./adminRoute/admin.removeStaff")


// Import staff routes


// Import user routes
const user_createAccount_Router = require("./userRoute/user.createAccount.route")
const user_uploadImage_Router = require("./userRoute/user.sendReport.route")


// Import shared routes
const loginAccount_Router = require("./sharedRoute/login.route")


// Function constructor
function routes(app) {
    // Wake server up
    app.get("/wake", (req, res) => {
        return res.json({
            status: 200,
            data: {
                mess: "I'm here"
            }
        })
    })

    // Admin ---------------------------------------------------------------------------------
    // Route: admin-login
    app.use("/admin-login", admin_login_Router)

    // Route: admin-upload
    app.use("/admin-upload", admin_uploadImage_Router)

    // Route: admin-remove-staff
    app.use("/admin-remove-staff", admin_removeStaff_Router)

    // STAFF ---------------------------------------------------------------------------------


    // USER ----------------------------------------------------------------------------------
    // Route: create-account
    app.use("/create-account", user_createAccount_Router)

    // Route: send-report
    app.use("/send-report", user_uploadImage_Router)

    // Shared --------------------------------------------------------------------------------
    // Route: login-account
    app.use("/login-account", loginAccount_Router) // For Staff and User
}

module.exports = routes