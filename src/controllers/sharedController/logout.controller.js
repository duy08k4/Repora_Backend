// Import model
const { logoutAccount_Model } = require("../../models/sharedModel/logout.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class logoutAccount_Controller {

    // [POST] /logout-account
    async logoutAccount(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'GET':
                await logoutAccount_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new logoutAccount_Controller