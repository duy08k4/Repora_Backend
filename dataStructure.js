// Admin
const adminAccount = {
    gmail: "",
    password: "",
    role: "admin",
    id: "",
    level: "1 | 2 | 3 | 4"
}

// Staff
const staffAccount = {
    gmail: "",
    password: "",
    name: "",
    id: ""
}

const staffInformation = {
    gmail: "",
    name: "",
    id: "",
    avatarCode: "",
    role: "staff",
    taskList: ["<taskID>", "<taskID>", "<taskID>", "<taskID>", "<taskID>"],
    taskDone: ["<taskID>", "<taskID>", "<taskID>", "<taskID>", "<taskID>"]
}

// New Staff
const newStaff = {
    name: "",
    gmail: "",
    avatarCode: ""
}

// User
const userAccount = {
    gmail: "",
    password: "",
    nane: "",
    id: ""
}

const userInfomation = {
    gmail: "",
    name: "",
    id: "",
    avatarCode: "",
    role: "user",
    reportList: ["<reportID>", "<reportID>", "<reportID>", "<reportID>"],
}

// Report form
const report = {
    name: "",
    reportID: "",
    type: "",
    level: "",
    reporter: {
        name: "",
        gmail: ""
    },
    time: "",
    position: [0, 0],
    imgCode: "",
    staff: ["<staffID>", "<staffID>", "<staffID>", "<staffID>"],
    state: "proccessing"
}

const doneReport = {
    name: "",
    reportID: "",
    type: "",
    level: "",
    reporter: "",
    time: "",
    position: [0, 0],
    imgCode: "",
    state: "done"
}

// Staff state
const staffState = {
    state: "on | off | busy",
    haveTask: true || false
}

// Token 
const token = {
    gmail: "",
    userID: "",
    role: ""
}