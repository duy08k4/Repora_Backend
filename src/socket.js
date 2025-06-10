// Import
const { FieldValue } = require("firebase-admin/firestore")
const db = require("./config/firebaseSDK");
const { sha256 } = require("js-sha256");

// Socket
const staffs_GmailKey = {} // { btoa(gmail): socketId, btoa(gmail): socketId }
const staffs_SocketidKey = {} // { socketId: gmail, socketId: gmail }

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        //Staff ---------------------------------------------------------------------------------------
        socket.on("connected", (data) => {
            const staffGmail = data.staffGmail

            staffs_GmailKey[btoa(staffGmail)] = socket.id
            staffs_SocketidKey[socket.id] = staffGmail

            db.collection("staffStatus").doc(sha256(staffGmail)).set({
                status: true
            }, { merge: true }).then(() => {
                console.log("✅✅✅ SUCCESS::Client's status was updated (Online). Action: Connect ✅✅✅")
            }).catch((err) => {
                console.log(`❌❌❌ ERROR<staff-status>:: ${err} ❌❌❌`)
            })
        })

        // Set "false" (offline) for user who do logout action
        socket.on("logout", (gmail) => {
            db.collection("staffStatus").doc(sha256(gmail)).set({
                status: false
            }).then(() => {
                console.log("✅✅✅ SUCCESS::Client's status was updated (Offline). Action: Disconnect 🔴🔴🔴")
            }).catch((err) => {
                console.log(`❌❌❌ ERROR<staff-status>:: ${err} ❌❌❌`)
            })

            try {
                delete staffs_SocketidKey[staffs_GmailKey[btoa(gmail)]]
                delete staffs_GmailKey[btoa(gmail)]
            } catch {}
        })

        // Staffs share their location to admin, reporter and another staff
        socket.on('shareLocation', (data) => {
            if (data) {
                const staffGmail = data.staffGmail
                const staffLocation = data.staffLocation

                socket.broadcast.emit("receiveLocation", {
                    from: staffGmail,
                    location: staffLocation
                });
            }
        })

        // Disconnect
        socket.on('disconnect', async () => {
            const staffGmail = staffs_SocketidKey[socket.id]
            const currentSocketId = socket.id


            setTimeout(() => {
                // Thoát là coi như off
                const stillOnline = Object.entries(staffs_SocketidKey).some(([sid, gmail]) =>
                    gmail === staffGmail && sid !== currentSocketId
                )

                if (!stillOnline && staffGmail) {
                    db.collection("staffStatus").doc(sha256(staffGmail)).set({
                        status: false
                    }).then(() => {
                        console.log("✅✅✅ SUCCESS::Client's status was updated (Offline). Action: Disconnect 🔴🔴🔴")
                        console.log(`✅✅✅ Staff:: ${staffGmail}. Action: Disconnect 🔴🔴🔴`)
                    }).catch((err) => {
                        console.log(`❌❌❌ ERROR<staff-status>:: ${err} ❌❌❌`)
                    })
                }

                // Xóa cache
                delete staffs_GmailKey[btoa(staffGmail)]
                delete staffs_SocketidKey[currentSocketId]
            }, 3000)

        })
    });
};