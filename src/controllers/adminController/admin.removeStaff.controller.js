// Import model
const { Admin_removeStaff_Model } = require("../../models/adminModel/admin.removeStaff.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class admin_removeStaff_Controller {
    // [POST] /admin-remove-staff
    async removeStaff(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await Admin_removeStaff_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new admin_removeStaff_Controller