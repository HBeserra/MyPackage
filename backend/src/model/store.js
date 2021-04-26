const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    timestamp: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId}],
    location: {
        zip: {
            type: Number,
            required: true
        },
    }
})

module.exports = mongoose.model("store", Schema)