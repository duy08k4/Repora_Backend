// Import database
const db = require("../../config/firebaseSDK")
const { v4 } = require("uuid")
const { sha256 } = require("js-sha256")

// Remove staff model
const Admin_contact_Model = async (req, res) => {
    const data = req.body.data

    if (data) {
        const gmail = data.gmail
        const username = data.username
        const description = data.description

        const result = await db.collection("contactRequire").doc(sha256(gmail)).set({
            [`${v4()}`]: {
                gmail,
                username,
                description
            }
        }).then(() => {
            return {
                status: 200,
                data: {
                    mess: "Sent"
                }
            }
        }).catch((err) => {
            console.log(`=====> ERROR: ${err}`)
        })

        return res.json(result)
    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Can't send your contact form"
            }
        })
    }

}

module.exports = {
    Admin_contact_Model
}