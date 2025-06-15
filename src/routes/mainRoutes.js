// Import database
const db = require("../config/firebaseSDK")

// Import admin routes
const admin_login_Router = require("./adminRoute/admin.login.route")
const admin_uploadImage_Router = require("./adminRoute/admin.upload.route")
const admin_removeStaff_Router = require("./adminRoute/admin.removeStaff")
const admin_taskAssingment_Router = require("./adminRoute/admin.taskAssignment.route")
const admin_contact_Router = require("./adminRoute/admin.contact.route")


// Import staff routes
const staff_taskResponse_Router = require("./staffRoute/staff.taskResponse.route")
const staff_responseDone_Router = require("./staffRoute/staff.responseDone.route")


// Import user routes
const user_createAccount_Router = require("./userRoute/user.createAccount.route")
const user_uploadImage_Router = require("./userRoute/user.sendReport.route")


// Import shared routes
const loginAccount_Router = require("./sharedRoute/login.route")
const logoutAccount_Router = require("./sharedRoute/logout.route")


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

    // Route: admin-assign-task
    app.use("/admin-assign-task", admin_taskAssingment_Router)

    // Route: admin-contact
    app.use("/admin-contact", admin_contact_Router)


    // STAFF ---------------------------------------------------------------------------------
    // Route: staff-task-response
    app.use("/staff-task-response", staff_taskResponse_Router)

    // Route: staff-task-response-done
    app.use("/staff-task-response-done", staff_responseDone_Router)


    // USER ----------------------------------------------------------------------------------
    // Route: create-account
    app.use("/create-account", user_createAccount_Router)

    // Route: send-report
    app.use("/send-report", user_uploadImage_Router)


    // Shared --------------------------------------------------------------------------------
    // Route: login-account
    app.use("/login-account", loginAccount_Router) // For Staff and User

    // Route: logout-account
    app.use("/logout-account", logoutAccount_Router)
}

module.exports = routes