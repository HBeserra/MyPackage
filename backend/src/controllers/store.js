const model = require("../model/store")

class Controller {
    async add(req,res) {
        var Data = new Object
         
        Data.name = req.body.name
        Data.timestamp = Date.now()
        Data.admin_id = req.body.admin_id
        Data.location = new Object;
        Data.location.zip = req.body.location.zip

        var data = await model.create(Data)
        res.json(data)

        return res;
    }
    
}

module.exports = new Controller();