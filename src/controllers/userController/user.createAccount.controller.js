// Import model
const user_createAccount_Model = require("../../models/userModel/user.createAccount.model")
const user_sendOTP_Model = require("../../models/userModel/user.sendOTP.model")
const user_verifyOtp_Model = require("../../models/userModel/user.verifyOTP.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class user_createAccount_Controller {

    // [POST] /create-account
    async createAccount(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'POST':
                await user_createAccount_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }

    // [POST] /create-account/send-otp
    async sendOTP(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'POST':
                await user_sendOTP_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }

    // [POST] /create-account/verify-otp
    async verifyOTP(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'POST':
                await user_verifyOtp_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new user_createAccount_Controller