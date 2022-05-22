const model = require("../model/store")

class Controller {
    async addStore(req,res) {
        let result
        try {
            result = await model.create({
                timestamp: Date.now(),
                name: req?.body?.name,
                admin: req.token?.payload?.iss,
                location: req.body?.location,
                users: [req?.token?.payload?.iss]
            })    
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
        return res.json(result);
    }
    async listStores(req,res){
        let result
        try {
            result = await model.find({users: req?.token?.payload?.iss}, "_id name", {})
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
        return res.json(result)
    }
    async infoStore(req,res){
        try {
            console.log(req?.body?.ids)
            const result = await model.find({_id: req?.body?._id})
            return res.json(result)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
    }
    async updateStore(req,res){
        try {
            console.log(req?.body?.ids)
            const result = await model.findOneAndUpdate({_id:req?.body?.store},{
                address: {
                    zip: req.body?.zip
                }
            })
            return res.json(result)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
    }
       
    async addVendor(req,res){
        try {
            console.log(req?.body?.ids)
            const result = await model.findOneAndUpdate({_id:req?.body?.store},{
                $push: {users: {$each: req?.body?.ids}}
            })
            return res.json(result)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
    }
    async removeVendor(req,res){
        try {
            console.log(req?.body?.ids)
            const result = await model.findOneAndUpdate({_id:req?.body?.store},{
                $pullAll: {users: {$each: req?.body?.ids}}
            })
            return res.json(result)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)
        }
    }
}

module.exports = new Controller();