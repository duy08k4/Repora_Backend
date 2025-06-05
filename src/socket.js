// Import
const { FieldValue } = require("firebase-admin/firestore")
const db = require("./config/firebaseSDK")

// Socket
const users_GmailKey = {} // { btoa(gmail): socketId, btoa(gmail): socketId } => Use for send location to client's friends.
const users_SocketidKey = {} // { socketId: gmail, socketId: gmail } => Use for update "offline" status's client to all Friend when client disconnect (close app).
const userFriends = {} // { btoa(gmail): [{}, {}, {}] } => Use for update "offline" status's client to all Friend too.

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Announce active status to client's friends when client connected
        socket.on("connected", (data) => {

        })

        // Set "false" (offline) for user who do logout action
        socket.on("userLogout", (gmail) => {
        
        })

        // Share location
        socket.on('shareLocation', (data) => {
        
        })

        // Disconnect
        socket.on('disconnect', () => {
            
        })
    });
};