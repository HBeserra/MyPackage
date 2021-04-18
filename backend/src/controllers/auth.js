const model = require("../model/users")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { response } = require("express")
const mongoose = require("mongoose")

const {createToken,verifyToken} = require("../utils/auth")


class Controller {
    async login(req,res) {
        var dbResponse = (await model.findOne({ 'email.address': req.body.email },"_id password email").exec()) // Verifica se existe uma conta com o email informado 
        if(typeof(dbResponse) == "Object" || dbResponse.hasOwnProperty("_id")) return res.sendStatus(400);
        
        const passwordHash = crypto.createHash("sha256").update(dbResponse.password.salt+req.body.password).digest("hex") // Compara a senha informada com o hash+salt no banco de dados 
        if(passwordHash != dbResponse.password.hash)  return res.sendStatus(400);

        //return dbResponse.email.confirmed? res.json(createToken({iss: dbResponse._id,scopes:["user-read-data"]})) : res.sendStatus(403) // Retorna o token ou informa que o email nao foi confirmado
        
        if (dbResponse.email.confirmed) return res.json(createToken({iss: dbResponse._id,scopes:["user-read-data"]})) 
        
            const confirmationToken = createToken({iss: data._id,scopes:["email-confirmation"], email:UserData.email.address})
            console.log(data,confirmationToken)
            confirmationEmail(UserData.email.address,`${process.env.SERVER_LINK}/api/v1/user/?token=${confirmationToken.token}`)
    }
    
    async emailConfirmation(req,res){
        const payload = verifyToken(req.query.token) // Obtem as informações do token de acesso
        console.log(payload)
        if(!payload || !payload.scopes.includes("email-confirmation")) return res.sendStatus(401) // Retorna se o token não for valido
        
        // O _ID do usuario e o email são utilizados na query para evitar que o usuario consiga confirmar uma conta alterando o email
        const dbResponse = await model.findOneAndUpdate({_id:payload.iss,"email.address":payload.email},{ "email.confirmed": true},{"projection":"email _id"}).exec()
        console.log(dbResponse)
        return (typeof(dbResponse) == Object)? res.redirect(`http://google.com/`) : res.sendStatus(403) 
    }
}

module.exports = new Controller();