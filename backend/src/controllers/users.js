const USERS = require("../model/users")
const crypto = require('crypto')
const {createToken,verifyToken} = require("../utils/auth")
const mongoose = require("mongoose")

const {confirmationEmail} = require('../utils/mail')



class UserController {
    async get(req,res) {
        const payload = verifyToken(req.headers['authorization']) // Obtem as informações do token de acesso

        if(!payload || payload.scopes.includes("user-read-data")) return res.send(401) // Retorna se o token não for valido

        const user = await USERS.findById(mongoose.Types.ObjectId(payload.iss), '-password').exec() // Obtem as informações do usuario exceto as informações de login 
        return res.json(user);
    }
    async add(req,res) {
        var UserData = {
            "name": "",
            "email": {},
            "password": {},
            "date": {}
        }
        UserData.name = req.body.name
        UserData.email.address = req.body.email
        UserData.password.salt = crypto.createHash('md5').update(req.body.email).digest('hex')
        UserData.password.hash = crypto.createHash("sha256").update(UserData.password.salt+req.body.password).digest("hex")
        UserData.timestamp = Date.now()

        // verify if email exist in users db
        if ( await USERS.findOne({ 'email.address': UserData.email.address},"_id").exec()){
            //console.log(lar)
            res.status(400);
            res.send("erro ja existe uma conta com esse e-mail")
        }else{
            var data = await USERS.create(UserData)
            const confirmationToken = createToken({iss: data._id,scopes:["email-confirmation"], email:UserData.email.address})
            console.log(data,confirmationToken)
            confirmationEmail(UserData.email.address,`${process.env.SERVER_LINK}/api/v1/user/?token=${confirmationToken.token}`)
            res.json(data)
        }
        return res;
    }
    
}

module.exports = new UserController();