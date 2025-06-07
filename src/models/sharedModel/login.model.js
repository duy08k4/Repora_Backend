// Import libraries
const { v4 } = require("uuid")
const jwt = require("jsonwebtoken");
const ms = require("ms")

// Import database
const db = require("../../config/firebaseSDK")
const hs256 = require("js-sha256")

// Generate create account time
function createdTime() {
    const time = new Date()
    const minute = time.getMinutes()
    const date = time.getDate().toString()
    const month = time.getMonth().toString()
    const year = time.getFullYear().toString()
    const hour = time.getHours().toString()

    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute} - ${date} THG ${month}, ${year}`
}

// Generate create account time
function generateAvartarCode() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `${(timestamp + random).toString()}`;
}

// Check existence's account
async function checkExistence(req, res) {
    const data = req.body.data
    const gmail = data.gmail
    const userRef = await db.collection("accounts").doc(btoa(gmail)).get()

    if (userRef.exists) {
        res.clearCookie("otp")
        return {
            status: 404,
            data: {
                mess: "Account already exist"
            }
        }
    } else return false
}

// Model
const loginAccount_Model = async (req, res) => {
    const data = req.body.data
    if (data) {
        const inputGmail = data.gmail
        const inputPassword = data.password

        const checkUserRef = await db.collection("accounts").doc(btoa(inputGmail)).get()

        if (checkUserRef.exists) { // Kiểm tra xem có phải là user không
            const userID = checkUserRef.data().uuid
            const userRole = checkUserRef.data().role

            if (checkUserRef.data().gmail == inputGmail && checkUserRef.data().password == inputPassword) {
                // Create accessToken for user
                const acToken = jwt.sign({ gmail: inputGmail, userID: userID, role: userRole }, process.env.SCKEY_USER, {
                    expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                });

                // Create refreshToken for user
                const rfToken = jwt.sign({ gmail: inputGmail, userID: userID, role: userRole }, process.env.SCKEY_USER, {
                    expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                });

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
                        mess: "Login successfully",
                        data: {
                            gmail: inputGmail,
                            role: checkUserRef.data().role
                        }
                    }
                })
            } else {
                return res.json({
                    status: 404,
                    data: {
                        mess: "Login failed"
                    }
                })
            }
        } else {
            // Kiểm tra tài khoản của staff
            const checkStaffRef = await db.collection("staffAccount").doc(hs256(inputGmail)).get()

            if (checkStaffRef.exists) {
                const staffGmail = checkStaffRef.data().gmail
                const staffPassword = checkStaffRef.data().password

                if (staffGmail == inputGmail && staffPassword == inputPassword) {
                    const staffID = checkStaffRef.data().uuid
                    const staffRole = checkStaffRef.data().role

                    // Create accessToken for staff
                    const acToken = jwt.sign({ gmail: inputGmail, userID: staffID, role: staffRole }, process.env.SCKEY_STAFF, {
                        expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                    });

                    // Create refreshToken for staff
                    const rfToken = jwt.sign({ gmail: inputGmail, userID: staffID, role: staffRole }, process.env.SCKEY_STAFF, {
                        expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                    });

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
                            mess: "Login successfully",
                            data: {
                                gmail: inputGmail,
                                role: checkStaffRef.data().role
                            }
                        }
                    })
                } else {
                    return res.json({
                        status: 404,
                        data: {
                            mess: "Can't login"
                        }
                    })
                }
            } else {
                // Kiểm tra xem gmail có nằm trong danh sách nhân viên mới (newStaff) hay không? Nếu có ==> Active
                const checkNewStaff = await db.collection("newStaff").doc(hs256(inputGmail)).get()

                if (checkNewStaff.exists) {
                    const staffID = `s-repora:${v4()}`
                    const batch = db.batch()

                    batch.set(db.collection("staffAccount").doc(hs256(inputGmail)), {
                        gmail: checkNewStaff.data().gmail,
                        password: inputPassword,
                        username: checkNewStaff.data().name,
                        role: "staff",
                        uuid: staffID
                    })

                    batch.set(db.collection("staffInformation").doc(hs256(inputGmail)), {
                        gmail: checkNewStaff.data().gmail,
                        username: checkNewStaff.data().name,
                        uuid: staffID,
                        avatarCode: checkNewStaff.data().avatarCode,
                        role: "staff",
                        taskList: [],
                        taskDone: [],
                        createdTime: createdTime()
                    })

                    batch.delete(db.collection("newStaff").doc(hs256(inputGmail)))

                    const result = await batch.commit().then(() => {
                        return {
                            status: 200,
                            data: {
                                mess: "Have a nice day !",
                                data: {
                                    gmail: checkNewStaff.data().gmail,
                                    role: "staff"
                                }
                            }
                        }
                    }).catch((err) => {
                        console.log(`=====> ERROR: ${err}`)
                        return {
                            status: 404,
                            data: {
                                mess: "Can't login"
                            }
                        }
                    })

                    if (result.status == 200) {
                        // Create accessToken for new staff
                        const acToken = jwt.sign({ gmail: inputGmail, userID: staffID, role: "staff" }, process.env.SCKEY_STAFF, {
                            expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                        });

                        // Create refreshToken for new staff
                        const rfToken = jwt.sign({ gmail: inputGmail, userID: staffID, role: "staff" }, process.env.SCKEY_STAFF, {
                            expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                        });

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
                } else {
                    return res.json({
                        status: 404,
                        data: {
                            mess: "Can't login"
                        }
                    })
                }
            }
        }

        return res.json({
            status: 404,
            data: {
                mess: "Can't login"
            }
        })

    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Can't login"
            }
        })
    }
}

module.exports = loginAccount_Model