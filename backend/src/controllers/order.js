const mongoose = require("mongoose")
const model = require("../model/order")


async function detail(req,res) {
    try {
        let result = await model.findOne(req?.body?.query)
        return res.json({result})
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}
async function list(req,res) {
    try {
        let skip = (req?.body?.skip)? req?.body?.skip : 0
        let result = await model.find(req?.body?.query, null, { skip: req?.body?.skip, limit: 10})
        let count = await model.countDocuments(req?.body?.query)
        return res.json({result, count, skip})
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

class Controller {


    async listOrDetail(req,res){
        return list(req,res)
    }

    async create(req,res){
        try {
            let result = await model.create({
                timestamp: Date.now(),
                store: req?.body?.store,
                vendor: mongoose.Types.ObjectId(req?.token?.payload?.iss),
            })
            return res.json(result)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)  
        }
    }
    async createPackage(req,res){
        try {
            let order = await model.findOneAndUpdate({_id: mongoose.Types.ObjectId(req?.body?.order)},{$push: {packages: {$each: req?.body?.packages}}})
            return res.json(order)
        } catch (error) {
            console.error(error)
            return res.sendStatus(500)  
        }
    }
}


module.exports = new Controller();