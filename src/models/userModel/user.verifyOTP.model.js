const user_verifyOtp_Model = (req, res) => {
    const getOtp = req.cookies.otp
    const data = req.body.data
    const getInputOtp = data.inputOtp

    if (getInputOtp == getOtp) {
        res.clearCookie("otp")
        return res.json({
            status: 200,
            data: {
                mess: "Verified"
            }
        })
    }

    return res.json({
        status: 400,
        data: {
            mess: "OTP code is incorrect"
        }
    })
}

module.exports = user_verifyOtp_Model