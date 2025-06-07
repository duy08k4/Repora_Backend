// Import libraries
const sha256 = require("js-sha256").sha256
const { v4 } = require("uuid")
// Import database
const { cloudinary } = require("../../config/cloudinary")
const db = require("../../config/firebaseSDK")

// Generate avatarCode
function generateAvartarCode() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `staff${(timestamp + random).toString()}`;
}

// -------------------------------------------------------------------------------------------------------------
// Create staff account
const addStaff = async (req, res, avatarCodeInput) => {
    const data = req.body
    if (data) {
        const name = data.name
        const gmail = data.gmail
        // Check staff's existence
        const newStaffRef = await db.collection("newStaff").doc(sha256(gmail)).get()

        if (!newStaffRef.exists) {
            db.collection("newStaff").doc(sha256(gmail)).set({
                name: name,
                gmail: gmail,
                avatarCode: avatarCodeInput
            }).then(() => { })
                .catch((error) => {
                    console.log(`=====> ERROR: ${error}`)
                    return res.json({
                        status: 404,
                        data: {
                            mess: "Can't add staff"
                        }
                    })
                })
        } else return res.json({
            status: 404,
            data: {
                mess: "Can't add staff"
            }
        })

    } else return res.json({
        status: 404,
        data: {
            mess: "Can't add staff"
        }
    })
}

// Upload image model
const Admin_uploadImage_Model = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                status: 404,
                data: {
                    mess: "Can't add staff"
                }
            })
        }

        // Upload ảnh lên Cloudinary, dùng buffer (file lưu trong memoryStorage)
        const avatarCode = generateAvartarCode()
        await addStaff(req, res, avatarCode)

        const result = await cloudinary.uploader.upload_stream({ folder: 'staff', public_id: avatarCode }, (error, result) => {
            if (error) {
                console.error(error);
                return res.json({
                    status: 404,
                    data: {
                        mess: "Can't add staff"
                    }
                })
            }
            // Trả kết quả về client
            return res.json({
                status: 200,
                data: {
                    mess: "Add"
                }
            })
        }
        );

        // Đẩy buffer file vào upload_stream
        result.end(req.file.buffer);

    } catch (error) {
        console.error(error);
        return res.json({
            status: 404,
            data: {
                mess: "Can't add staff"
            }
        })
    }
}

module.exports = {
    Admin_uploadImage_Model
}