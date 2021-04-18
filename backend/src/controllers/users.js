const USERS = require("../model/users")
const crypto = require('crypto')
const {verifyToken} = require("../utils/auth")
const mongoose = require("mongoose")

class UserController {
    async get(req,res) {
        
        var payload = verifyToken(req.headers['authorization'])
        if(!payload) return res.send(401)

        const user = await USERS.findById(mongoose.Types.ObjectId(payload.iss), '-password').exec()
        


        res.json(user)
        return res;
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
            res.json(data)
        }
        return res;
    }
    
}

module.exports = new UserController();