const model = require("../model/users")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { response } = require("express")

function createToken(payload){
    const token = jwt.sign(payload,process.env.AUTH_SECRET , {expiresIn:"2h"}) // cria o token jwt com token informado
    return {token}
}

class Controller {
    async login(req,res) {
        const dbResponse = (await model.findOne({ 'email.address': req.body.email },"_id password email").exec()) // Verifica se existe uma conta com o email informado 
        if(!dbResponse._id) return res.sendStatus(400);


        const passwordHash = crypto.createHash("sha256").update(dbResponse.password.salt+req.body.password).digest("hex") // Compara a senha informada com o hash+salt no banco de dados 
        if(passwordHash != dbResponse.password.hash)  return res.sendStatus(400);

        return dbResponse.email.confirmed? res.json(createToken({iss: dbResponse._id})) : res.sendStatus(403) // Retorna o token ou informa que o email nao foi confirmado
    }

    async reSendConfimation(req,res){

        return res.sendStatus(200)
    }
    
}

module.exports = new Controller();