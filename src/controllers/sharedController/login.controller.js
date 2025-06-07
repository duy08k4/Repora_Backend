// Import model
const loginAccount_Model = require("../../models/sharedModel/login.model")
const { user_autoLogin_Model, staff_autoLogin_Model } = require("../../models/sharedModel/autoLogin.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class loginAccount_Controller {

    // [POST] /login-account
    async loginAccount(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'POST':
                await loginAccount_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }

    // [GET] /login-account/user-auto
    async userAutoLogin(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'GET':
                await user_autoLogin_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }

    // [GET] /login-account/staff-auto
    async staffAutoLogin(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'GET':
                await staff_autoLogin_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new loginAccount_Controller