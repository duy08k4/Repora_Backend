// Import database
const db = require("../config/firebaseSDK")

// Import admin routes
const admin_login_Router = require("./adminRoute/admin.login.route")
const admin_uploadImage_Router = require("./adminRoute/admin.upload.route")


// Import staff routes


// Import user routes
const user_createAccount_Router = require("./userRoute/user.createAccount.route")


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

    // STAFF ---------------------------------------------------------------------------------


    // USER ----------------------------------------------------------------------------------
    // Route: create-account
    app.use("/create-account", user_createAccount_Router)

    // Shared --------------------------------------------------------------------------------

    // Route: login-account
    // app.use("/login-account", loginRouter)
}

module.exports = routes