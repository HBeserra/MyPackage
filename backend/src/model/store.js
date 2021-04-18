const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    timestamp: {
        type: Number,
        required: true
    },
    name: String,
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users_id: [mongoose.Schema.Types.ObjectId],
    location: {
        zip: {
            type: Number,
            required: true
        },
    },    
})

module.exports = mongoose.model("store", Schema)