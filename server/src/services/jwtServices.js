const jwt = require('jsonwebtoken');

class JwtServices {

    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m',
        });
    }

    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded);
            });
        });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
    }

    verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded);
            });
        });
    }
}

module.exports = new JwtServices();