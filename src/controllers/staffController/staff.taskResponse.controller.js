// Import model
const { Staff_taskResponse_Model } = require("../../models/staffModel/staff.taskResponse.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class staff_taskResponse_Controller {
    // [POST] /staff-task-response
    async taskResponse(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await Staff_taskResponse_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new staff_taskResponse_Controller