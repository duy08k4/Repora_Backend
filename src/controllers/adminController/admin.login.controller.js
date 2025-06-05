// Import model
const { Admin_autoLogin_Model ,Admin_login_Model} = require("../../models/adminModel/admin.login.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class admin_login_Controller {
    
    // [POST] /admin-login
    async login(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await Admin_login_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }

    // [GET] /admin-login/auto
    async autoLogin(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'GET':
                await Admin_autoLogin_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new admin_login_Controller