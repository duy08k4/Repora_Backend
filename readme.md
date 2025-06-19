# API
**ADMIN - QUẢN TRỊ VIÊN**

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


**STAFF - NHÂN VIÊN KHẮC PHỤC SỰ CỐ** 

    // Route: staff-task-response
    app.use("/staff-task-response", staff_taskResponse_Router)

    // Route: staff-task-response-done
    app.use("/staff-task-response-done", staff_responseDone_Router)


**USER - NGƯỜI BÁO CÁO SỰ CỐ**

    // Route: create-account
    app.use("/create-account", user_createAccount_Router)

    // Route: send-report
    app.use("/send-report", user_uploadImage_Router)


**Shared - API CHUNG** 

    // Route: login-account
    app.use("/login-account", loginAccount_Router) // For Staff and User

    // Route: logout-account
    app.use("/logout-account", logoutAccount_Router) // For Admin and Staff and User