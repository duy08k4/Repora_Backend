// Import model
const { Admin_taskAssignment_Model } = require("../../models/adminModel/admin.taskAssignment.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class admin_taskAssignment_Controller {
    // [POST] /admin-assign-task
    async assign(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await Admin_taskAssignment_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new admin_taskAssignment_Controller