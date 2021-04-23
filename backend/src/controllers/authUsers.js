const model = require("../model/users")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { response } = require("express")
const mongoose = require("mongoose")

const {createToken,verifyToken,creteHashAndSalt} = require("../utils/auth")
const {EmailConfirmation, PasswordReset} = require('../utils/mail')

function sendConfirmationEmail(_id,email) {
    const confirmationToken =  createToken({iss: _id,scopes:["email-confirmation"], email:email})
    EmailConfirmation(email,confirmationToken.token)
}

class Controller{
    async userCreateAccount(req,res){
        if(await model.findOne({ 'email.address': req.body.email},"_id").exec()) return res.sendStatus(406) // retorna erro 406 se ja existir uma conta com esse email 
        
        const password = creteHashAndSalt(req?.body?.email,req?.body?.password)

        const result = await model.create({
            name: req?.body?.name,
            "email.address": req.body.email,
            timestamp: Date.now(),
            password: password
        })
        console.log(result,!result?._id,result._id)
        if(!result)return res.sendStatus(500)
        if(!result._id) return res.sendStatus(500)
        sendConfirmationEmail(result._id,req.body.email)
        return res.json(result)

    }
    async userReadAccountInfo(req,res){
        const response = await model.findById(mongoose.Types.ObjectId(req.token.payload.iss), '-password').exec() // Obtem as informações do usuario exceto as informações de login 
        return res.json(response);
    }
    async userModifyAccount(req,res){
        const update = req?.body?.update
        if(update?.password || update?.email || update?._id || update?.timestamp || update?.stores) return res.sendStatus(400) // Criar um novo modelo para subistituir isso
        
        try {
            const response = await model.findOneAndUpdate({_id:mongoose.Types.ObjectId(req?.token?.payload?.iss)}, update)    
        } catch (error) {
            console.warn(error)
            return res.sendStatus(500)
        }
        return res.json(response)        
    }
    async userModifyAccountEmail(req,res){
        sendConfirmationEmail(req?.token?.payload?.iss,req?.body?.email)
        return res.sendStatus(200)
    }

    async authLogin(req,res){
        let dbResponse = (await model.findOne({ 'email.address': req?.body?.email },"_id password email").exec()) // Busca no banco as informações do email informado
        
        if(!dbResponse?._id) return res.sendStatus(400);      // Verifica se existe uma conta com o email informado 
        
        const passwordHash = crypto.createHash("sha256").update(dbResponse.password.salt+req.body.password).digest("hex")   // utiliza o salt para criar o hash com a senha informada
        if(passwordHash != dbResponse?.password?.hash)  return res.sendStatus(400);   // Compara a senha informada com a no banco de dados 
        if (!dbResponse.email.confirmed) return res.sendStatus(403) // Verifica se o email foi confirmado
        return res.json(createToken({iss: dbResponse._id,scopes:["user-read-data","user-change-data"]})) // envia o token 
    }

    async authResetPassword(req,res){
        const response = (await model.findOne({ 'email.address': req?.body.email },"_id").exec())
        
        if(!response?._id) return res.sendStatus(400);

        const TokenObject = createToken({iss: response?._id,scopes:["password-reset"]})   

        PasswordReset(req?.body?.email,TokenObject?.token)
        res.sendStatus(200)
    }

    async authResetPasswordConfirmation(req,res){
        const password = creteHashAndSalt(req?.body?.email,req?.body?.password)

        const response = await model.findOneAndUpdate({_id:req?.token?.payload?.iss},{password},{"projection":"_id"}).exec()
        console.log(response, password)
        return (response?._id)? res.redirect(`http://google.com/`) : res.sendStatus(403) 
    }
    async authResendAccountConfirmation(req,res){

        const response = await model.findOne({"email.address":req?.query?.email},"_id").exec()
        
        if(!response?._id) return res.sendStatus(500)
        sendConfirmationEmail(response?._id,req?.query?.email)
        return res.json(response)
    }

    async authEmailConfirmation(req,res){
        // O _ID do usuario e o email são utilizados na query para evitar que o usuario consiga confirmar uma conta alterando o email
        const response = await model.findOneAndUpdate({_id:req.token.payload.iss},{"email.address": req?.token?.payload?.email, "email.confirmed": true},{"projection":"_id"}).exec()
        console.log(req.token,response)
        return (response?._id)? res.redirect(`http://google.com/`) : res.sendStatus(403) 
    }
}

module.exports = new Controller();