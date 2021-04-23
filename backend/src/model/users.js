const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        address: {
            type: String,
            required: true,
            unique: true
        },
        confirmed: {
            type: Boolean,
            default: false
        }
    },
    timestamp: Number,
    password: {
        hash: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        }
    },
    stores: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("user", userSchema)