const jwt = require("jsonwebtoken");
const ms = require("ms");

const userAuthorize = (req, res, next) => {
    const getAccessToken = req.cookies[process.env.ACCTOKEN_COOKIE_NAME];
    const getRefreshToken = req.cookies[process.env.REFTOKEN_COOKIE_NAME];

    if (getAccessToken && getRefreshToken) {
        jwt.verify(getAccessToken, process.env.SCKEY_USER, (accessToken_err, accessToken_decoded) => {
            if (accessToken_err) {
                // Access Token expired → check Refresh Token
                jwt.verify(getRefreshToken, process.env.SCKEY_USER, (refreshToken_err, refreshToken_decoded) => {
                    if (!refreshToken_err) {
                        // Refresh Token valid → create new Access Token
                        const newAccessToken = jwt.sign(
                            {
                                gmail: refreshToken_decoded.gmail,
                                userID: refreshToken_decoded.userID,
                                role: refreshToken_decoded.role
                            },
                            process.env.SCKEY_USER,
                            {
                                expiresIn: process.env.LIFE_TIME_ACC_TOKEN,
                            }
                        );

                        res.cookie(process.env.ACCTOKEN_COOKIE_NAME, newAccessToken, {
                            httpOnly: true,
                            secure: true,
                            path: "/",
                            sameSite: 'None',
                            maxAge: ms(process.env.LIFE_TIME_REF_TOKEN),
                        });

                        // Check Refresh Token lifetime
                        const now = Math.floor(Date.now() / 1000);
                        const leftLifeTime = refreshToken_decoded.exp - now;

                        if (leftLifeTime < 5 * 60) {
                            // If <5 minutes left → refresh it
                            const newRefreshToken = jwt.sign(
                                {
                                    gmail: refreshToken_decoded.gmail,
                                    userID: refreshToken_decoded.userID,
                                    role: refreshToken_decoded.role
                                },
                                process.env.SCKEY_USER,
                                {
                                    expiresIn: process.env.LIFE_TIME_REF_TOKEN,
                                }
                            );

                            res.cookie(process.env.REFTOKEN_COOKIE_NAME, newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: 'None',
                                maxAge: ms(process.env.LIFE_TIME_REF_TOKEN),
                            });
                        }

                        return next();
                    } else {
                        return res.status(498).json({
                            status: 498,
                            data: {
                                mess: "The login session has expired",
                            },
                        });
                    }
                });
            } else {
                return next();
            }
        });
    } else {
        return res.status(401).json({
            status: 401,
            data: {
                mess: "Please login your account",
            },
        });
    }
};

module.exports = userAuthorize;
