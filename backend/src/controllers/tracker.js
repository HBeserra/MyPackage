const tracker = require("../model/tracker")
const {rastrearEncomendas} = require('correios-brasil')  

async function updateLocation(){
    var result = await tracker.create(Data)

    if(result[0].lenght){

    }
}



class TrackerController {
    async add(req,res) {
        var Data = new Object
        Data.created = Date.now()
        Data.type = "correios"
        Data.code = "OO298048840BR"
        Data.last_update = new Object
        Data.last_update.timestamp = 0
        Data.location = Date.now()

        console.log(Data)
        Data.last_update.data  = await rastrearEncomendas([Data.code])
        var result = await tracker.create(Data)
            // .then(chatRoom => return res.json(chatRoom._id));

        console.log(Data.last_update)
        

        return res.json({"id": result});
    }


}

module.exports = new TrackerController();