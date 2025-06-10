// Import libraries
const sha256 = require("js-sha256").sha256

const { FieldValue } = require("firebase-admin/firestore")
// Import database
const db = require("../../config/firebaseSDK")

// Remove staff model
const Admin_taskAssignment_Model = async (req, res) => {
    const data = req.body.data

    if (data) {
        const listStaffGmail = data.listStaff
        const reportID = data.reportID
        const batch = db.batch()

        listStaffGmail.forEach(gmail => {
            batch.update(db.collection("staffInformation").doc(sha256(gmail)), {
                taskList: FieldValue.arrayUnion(reportID)
            })
        })

        const result = await batch.commit().then(() => {
            return {
                status: 200,
                data: {
                    mess: "Assigned"
                }
            }
        }).catch((err) => {
            console.log(`=====> ERROR<admin-task-assignment>: ${err}`)
            return {
                status: 404,
                data: {
                    mess: "Can't assign"
                }
            }
        })

        return res.json(result)

    } else {
        console.log("=====> ERROR<admin-task-assignment>: No data")
        return res.json({
            status: 404,
            data: {
                mess: "Can't assign"
            }
        })
    }
}

module.exports = {
    Admin_taskAssignment_Model
}