// Import model
const { Staff_responseDone_Model } = require("../../models/staffModel/staff.responseDone.model")

const wrongMethod_response = {
    status: 405,
    data: {
        mess: "Wrong method"
    }
}

// Controller
class staff_responseDone_Controller {
    // [POST] /staff-task-response-done
    async responseDone(req, res) {
        let requestMethod = req.method
        
        switch (requestMethod) {
            case 'POST':
                await Staff_responseDone_Model(req, res)
                break

            default:
                res.json(wrongMethod_response)
                break
        }
    }
}

module.exports = new staff_responseDone_Controller