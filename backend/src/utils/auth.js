var jwt = require('jsonwebtoken');


function verifyToken(token){
        try {
            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            return decoded
        } catch(err) {
            return false
        }
}

module.exports = {verifyToken}