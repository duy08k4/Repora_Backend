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
const addStaff = async (req, avatarCodeInput) => {
    const data = req.body
    if (!data) throw new Error("Invalid data")

    const name = data.name
    const gmail = data.gmail
    const newStaffRef = await db.collection("newStaff").doc(sha256(gmail)).get()
    const recentStaff = await db.collection("accounts").doc(btoa(gmail)).get()

    if (newStaffRef.exists || recentStaff.exists) {
        throw new Error("Staff already exists")
    }

    await db.collection("newStaff").doc(sha256(gmail)).set({
        name: name,
        gmail: gmail,
        avatarCode: avatarCodeInput
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

        const avatarCode = generateAvartarCode()

        // Gọi addStaff, nếu lỗi sẽ throw và nhảy vào catch
        await addStaff(req, avatarCode)

        // Upload lên Cloudinary
        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'staff', public_id: avatarCode },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                )
                stream.end(req.file.buffer)
            })
        }

        await streamUpload()

        // Chỉ gửi 1 lần response ở đây
        return res.json({
            status: 200,
            data: {
                mess: "Add"
            }
        })

    } catch (error) {
        console.error(error)
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