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

function createdTime() {
    const time = new Date()
    const minute = time.getMinutes()
    const date = time.getDate().toString()
    const month = time.getMonth().toString()
    const year = time.getFullYear().toString()
    const hour = time.getHours().toString()

    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute} - ${date} THG ${month}, ${year}`
}

// -------------------------------------------------------------------------------------------------------------
// Create staff account
const addReport = async (req, res, imgReportInput) => {
    const data = req.body
    if (data) {
        const name = data.name
        const type = data.type
        const level = data.level
        const reporter_gmail = data.reporter_gmail
        const reporter_name = data.reporter_name
        const position = data.position
        const reportID = v4()
        const time = createdTime()

        const batch = db.batch()

        batch.set(db.collection("report").doc(btoa(reportID)), {
            name: name,
            reportID: reportID,
            type: type,
            level: level,
            reporter: {
                name: reporter_name,
                gmail: reporter_gmail
            },
            time: time,
            position: JSON.parse(position),
            imgCode: imgReportInput,
            staff: [],
            state: "proccessing"
        })

        try {
            await batch.commit();
            return true;
        } catch (err) {
            console.log(`=====> ERROR: ${err}`)
            res.json({
                status: 404,
                data: {
                    mess: "Can't send your report"
                }
            });
            return false;
        }
    } else {
        res.json({
            status: 404,
            data: {
                mess: "Can't send your report"
            }
        });
        return false;
    }
}

// Upload image model
const User_uploadImage_Model = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                status: 404,
                data: {
                    mess: "Can't send report 1"
                }
            })
        }

        const imgReport = generateAvartarCode();
        const addReportResult = await addReport(req, res, imgReport);

        if (!addReportResult) {
            return; 
        }

        // Upload ảnh lên Cloudinary, dùng buffer (file lưu trong memoryStorage)
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'report', public_id: imgReport },
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.json({
                        status: 404,
                        data: {
                            mess: "Can't send your report"
                        }
                    })
                }

                return res.json({
                    status: 200,
                    data: {
                        mess: "Thanks for your contribution"
                    }
                })
            }
        );

        uploadStream.end(req.file.buffer);

    } catch (error) {
        console.error(error);
        return res.json({
            status: 404,
            data: {
                mess: "Can't send your report"
            }
        })
    }
}


module.exports = {
    User_uploadImage_Model
}