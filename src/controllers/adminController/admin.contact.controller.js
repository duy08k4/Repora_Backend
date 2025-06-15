// Import model
const { Admin_contact_Model } = require("../../models/adminModel/admin.contact.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class admin_contact_Controller {

    // [POST] /admin-contact
    async send(req, res) {
        let requestMethod = req.method

        switch (requestMethod) {
            case 'POST':
                await Admin_contact_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new admin_contact_Controller