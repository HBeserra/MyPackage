var jwt = require('jsonwebtoken');

function createToken(payload,expiresIn = "2h"){
    const token = jwt.sign(payload,process.env.AUTH_SECRET , {expiresIn: expiresIn}) // cria o token jwt com token informado
    return {token}
}


function createConfirmationToken(payload,expiresIN){
    const timestamp = Date.now()
    const expire = timestamp + expiresIN

}

function verifyToken(token){
        try {
            const decoded = jwt.verify(token, process.env.AUTH_SECRET);
            return decoded
        } catch(err) {
            return false
        }
}

module.exports = {createToken,verifyToken}