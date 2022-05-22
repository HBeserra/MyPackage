const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    created: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['posted', 'in-transit', 'delivered'],
        default: 'posted'
    },
    type: {
        type: String,
        default: "correios"
    },

    code: {
        type: String,
        required: true
    },
    last_update: {
        timestamp: {
            type: mongoose.Schema.Types.Number,
            required: true
        },
        data: Array
    },
    location: {
        type: String,
    },
    map: {
        timestamp: {
            type: mongoose.Schema.Types.Number,
        },
        
        img: {
            type: Buffer,
        },

    }
})

module.exports = mongoose.model("tacker", trackSchema)