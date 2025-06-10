// Import libraries
const sha256 = require("js-sha256").sha256

const { FieldValue } = require("firebase-admin/firestore")
// Import database
const db = require("../../config/firebaseSDK")

// Response Done staff model
const Staff_responseDone_Model = async (req, res) => {
    const data = req.body.data

    if (data) {
        const reportID = data.reportID
        const staffGmail = data.staffGmail

        const batch = db.batch()

        const checkReport = await db.collection("report").doc(btoa(reportID)).get()

        if (checkReport.exists) {
            const getActiveStaff = checkReport.data().activeStaff
            const requiredStaff = checkReport.data().staff

            if (Math.abs(getActiveStaff.length - requiredStaff.length) == 1) {
                batch.update(db.collection("report").doc(btoa(reportID)), {
                    state: "done"
                })
            }
        }

        batch.update(db.collection("report").doc(btoa(reportID)), {
            staff: FieldValue.arrayUnion(staffGmail)
        })

        batch.update(db.collection("staffInformation").doc(sha256(staffGmail)), {
            taskList: FieldValue.arrayRemove(reportID)
        })

        const result = await batch.commit().then(() => {
            return {
                status: 200,
                data: {
                    mess: "Have a good day!"
                }
            }
        }).catch((err) => {
            console.log(`=====> ERROR<Staff_responseDone_Model>: ${err}`)
            return {
                status: 400,
                data: {
                    mess: "Can't proccess..."
                }
            }
        })

        return res.json(result)

    } else {
        return res.json({
            status: 404,
            data: {
                mess: "Can't proccess..."
            }
        })
    }
}

module.exports = {
    Staff_responseDone_Model
}