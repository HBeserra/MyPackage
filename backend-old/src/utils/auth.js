var jwt = require('jsonwebtoken');
const crypto = require('crypto')

function createToken(payload, expiresIn = "2h") {
    const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: expiresIn }) // cria o token jwt com token informado
    return { token }
}

function creteHashAndSalt(email,password) {
    const salt = createSalt(email)
    const hash = createHash(salt,password)
    return {hash,salt}
}

function createHash(salt,password){
    return crypto.createHash("sha256").update(salt+password).digest("hex")               // Cria a hash da senha do usuario utilizando o salt gerado
}

function createSalt(email) {
    return crypto.createHash('md5').update(String(email+Date.now()+Math.random())).digest('hex') // Cria um salt aleatoria utilizando timestamp + email do usuario e um numero gerado pelo servidor
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.AUTH_SECRET);
    } catch (err) {
        return false
    }
}

function verifyTokenScope(scopes) {
    const middleware = (req, res, next) => {
        if(!(req.query.token || req.headers['authorization'])) return res.sendStatus(400)
        
        req.token = new Object
        if(req.query.token)req.token.encoded = req.query.token
        if(req.headers['authorization']) req.token.encoded = req.headers['authorization']

        req.token.payload = verifyToken(req.token.encoded)
        
        if(!req?.token?.payload?.scopes) return res.sendStatus(401)

        var boolArray = new Array(scopes.length)
        
        scopes.forEach((element, index) => {
            boolArray[index] = req?.token?.payload?.scopes.includes(element)
        });

        if (boolArray.includes(false)) {
            console.error("\n \x1b[31m ================== User Without acess ==================\x1b[0m \n\n",req.path,"\x1b[31m\nrequired scopes:\x1b[0m",scopes,"\x1b[31m \ntoken:\x1b[0m",req.token)
            return res.sendStatus(400)
        }

        next()
    }
    return middleware
}



module.exports = { createToken, verifyToken, verifyTokenScope,creteHashAndSalt }