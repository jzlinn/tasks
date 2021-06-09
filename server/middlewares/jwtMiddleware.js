let jwt = require('jsonwebtoken');
require('dotenv/config');

let checkToken = async (req, res, next) => {
    try {
        let token = await req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: 'Auth token is not supplied',
            statusCode: 500,
            error: error
        });
    }
};

module.exports = {
    checkToken: checkToken
}