const jwt = require('jsonwebtoken');

class JwtServices {

    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m',
        });
    }

    verifyAccessToken(token, callback) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, callback);
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
    }

    verifyRrefreshToken(token) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
}

module.exports = new JwtServices();