// Import libraries
const sha256 = require("js-sha256").sha256
const { v4 } = require("uuid")
const jwt = require("jsonwebtoken");
const ms = require("ms")

// Import database
const db = require("../../config/firebaseSDK")

// Auto login model
const Admin_autoLogin_Model = (req, res) => {
    const data = req.dataChecked

    if (data) {
        return res.json({
            status: 200,
            data: {
                mess: "Login successful",
                data: {
                    gmail: data.adminGmail_checked,
                    id: data.adminID_checked,
                    role: data.adminRole_checked
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

// Admin login model
const Admin_login_Model = async (req, res) => {
    const data = req.body.data
    if (data) {
        const adminGmail = data.gmail
        const adminPassword = data.password
        const adminRef = await db.collection("adminAccount").doc(sha256(adminGmail)).get()

        if (!adminGmail && !adminPassword) {
            return res.json({
                status: 200,
                data: {
                    mess: "Can't proccess... Please login again"
                }
            })
        }

        if (adminRef.exists) {
            // Login
            const getAdminGmail = adminRef.data().gmail
            const getAdminPassword = adminRef.data().password
            const getAdminID = adminRef.data().id
            const getAdminRole = adminRef.data().role


            if (getAdminGmail == adminGmail && getAdminPassword == adminPassword) {
                // Create accessToken
                const acToken = jwt.sign({ gmail: getAdminGmail, userID: getAdminID, role: getAdminRole }, process.env.SCKEY_ADMIN, {
                    expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                });

                // Create refreshToken
                const rfToken = jwt.sign({ gmail: getAdminGmail, userID: getAdminID, role: getAdminRole }, process.env.SCKEY_ADMIN, {
                    expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                });

                // Set cookie
                res.cookie(process.env.ACCTOKEN_COOKIE_NAME, acToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: 'None',
                    maxAge: ms(process.env.LIFE_TIME_REF_TOKEN)
                });

                res.cookie(process.env.REFTOKEN_COOKIE_NAME, rfToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: 'None',
                    maxAge: ms(process.env.LIFE_TIME_REF_TOKEN)
                });

                return res.json({
                    status: 200,
                    data: {
                        mess: "Welcome back my admin",
                        data: {
                            gmail: getAdminGmail
                        }
                    }
                })
            } else {
                return res.json({
                    status: 404,
                    data: {
                        mess: "Deny access"
                    }
                })
            }
        } else {
            // Add admin
            const adminID = v4()

            const result = await db.collection("adminAccount").doc(sha256(adminGmail)).set({
                gmail: adminGmail,
                password: adminPassword,
                role: "admin",
                id: adminID,
                level: "1"
            }).then(() => {
                return {
                    status: 200,
                    data: {
                        mess: "Welcome my admin",
                        data: {
                            gmail: adminGmail
                        }
                    }
                }
            }).catch((error) => {
                console.log(`=====> ERROR: ${error}`)
                return {
                    status: 404,
                    data: {
                        mess: "Can't proccess...  Please login again"
                    }
                }
            })

            if (result.status == 200) {
                // Create accessToken
                const acToken = jwt.sign({ gmail: adminGmail, userID: adminID, role: "admin" }, process.env.SCKEY_ADMIN, {
                    expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                });

                // Create refreshToken
                const rfToken = jwt.sign({ gmail: adminGmail, userID: adminID, role: "admin" }, process.env.SCKEY_ADMIN, {
                    expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                });

                // Set cookie
                res.cookie(process.env.ACCTOKEN_COOKIE_NAME, acToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: 'None',
                    maxAge: ms(process.env.LIFE_TIME_REF_TOKEN)
                });

                res.cookie(process.env.REFTOKEN_COOKIE_NAME, rfToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: 'None',
                    maxAge: ms(process.env.LIFE_TIME_REF_TOKEN)
                });
            }

            return res.json(result)
        }

    }
}

module.exports = {
    Admin_autoLogin_Model,
    Admin_login_Model
}