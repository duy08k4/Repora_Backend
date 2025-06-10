// Import libraries
const sha256 = require("js-sha256").sha256

const { FieldValue } = require("firebase-admin/firestore")
// Import database
const db = require("../../config/firebaseSDK")

// Task response staff model
const Staff_taskResponse_Model = async (req, res) => {
    const data = req.body.data

    if (data) {
        const staffResponse = data.staffResponse
        const reportID = data.reportID
        const staffGmail = data.staffGmail
        const batch = db.batch()

        if (staffResponse) {
            batch.update(db.collection("report").doc(btoa(reportID)), {
                activeStaff: FieldValue.arrayUnion(staffGmail)
            })

            const result = await batch.commit().then(() => {
                return {
                    status: 200,
                    data: {
                        mess: "Received"
                    }
                }
            }).catch((err) => {
                console.log(`=====> ERROR<staff-taskResponse>: ${err}`)
                return {
                    status: 404,
                    data: {
                        mess: "Can't receive the task"
                    }
                }
            })

            return res.json(result)
        } else {
            batch.update(db.collection("staffInformation").doc(sha256(staffGmail)), {
                taskList: FieldValue.arrayRemove(reportID)
            })

            const result = await batch.commit().then(() => {
                return {
                    status: 200,
                    data: {
                        mess: "Denied"
                    }
                }
            }).catch((err) => {
                console.log(`=====> ERROR<staff-taskResponse>: ${err}`)
                return {
                    status: 404,
                    data: {
                        mess: "Can't deny the task"
                    }
                }
            })


            return res.json(result)
        }
    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Can't proccess your action"
            }
        })
    }
}

module.exports = {
    Staff_taskResponse_Model
}