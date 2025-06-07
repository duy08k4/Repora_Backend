// Import libraries
const sha256 = require("js-sha256").sha256
const { v4 } = require("uuid")
const jwt = require("jsonwebtoken");
const ms = require("ms")

// Import database
const db = require("../../config/firebaseSDK")
const { cloudinary } = require("../../config/cloudinary")

// Remove staff model
const Admin_removeStaff_Model = async (req, res) => {
    const data = req.body.data
    console.log(data)

    if (data) {
        const inputPassword = data.password
        const inputGmail = data.gmail
        const adminRef = await db.collection("adminAccount").doc(sha256(inputGmail)).get()

        if (adminRef.exists) {
            const getAdminPassword = adminRef.data().password

            if (getAdminPassword == inputPassword) {
                const batch = db.batch()
                const listGmail = data.listGmail
                const listAvatarCode = data.listAvatarCode

                listGmail.forEach(gmail => {
                    batch.delete(db.collection("staffAccount").doc(sha256(gmail)))
                    batch.delete(db.collection("staffInformation").doc(sha256(gmail)))
                });

                const result = await batch.commit().then(() => {
                    return {
                        status: 200,
                        data: {
                            mess: "Removed"
                        }
                    }
                }).catch((err) => {
                    console.log(`=====> ERROR: ${err}`)
                    return {
                        status: 404,
                        data: {
                            mess: "Can't remove selected staff"
                        }
                    }
                })

                if (result.status == 200) {
                    try {
                        const results = await Promise.all(
                            listAvatarCode.map(publicId =>
                                cloudinary.uploader.destroy(publicId)
                            )
                        );
                        
                        return res.json({
                            status: 200,
                            data: {
                                mess: "Removed the selected staff"
                            }
                        })
                    } catch (error) {
                        console.log(`=====> ERROR: ${err}`)
                        return res.json({
                            status: 404,
                            data: {
                                mess: "Can't remove image's staff "
                            }
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        data: {
                            mess: "Can't remove selected staff"
                        }
                    })
                }

                // return res.json(result)

            } else {
                return res.json({
                    status: 404,
                    data: {
                        mess: "Can't remove selected staff"
                    }
                })
            }
        } else {
            return res.json({
                status: 404,
                data: {
                    mess: "Can't remove selected staff"
                }
            })
        }

    } else {
        console.log("=====> ERROR<admin_removeStaff_model>: No data")
        return res.json({
            status: 404,
            data: {
                mess: "Can't remove selected staff"
            }
        })
    }

    return res.json({
        status: 404,
        data: {
            mess: "Can't remove selected staff"
        }
    })
}

module.exports = {
    Admin_removeStaff_Model
}