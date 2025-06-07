// Import model
const { User_uploadImage_Model } = require("../../models/userModel/user.sendReport.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class user_uploadImage_Controller {
    // [POST] /send-report
    async uploadImage(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await User_uploadImage_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new user_uploadImage_Controller