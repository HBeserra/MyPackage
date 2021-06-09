const mongoose = require('mongoose')

const reqObjectID = { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
}
const reqNumber = {
    type: Number,
    required: true
}
const reqString = {
    type: String,
    required: true
}

const productsSchema = new mongoose.Schema({
    timestamp: reqNumber,
    product: reqObjectID,
    amount: reqNumber,
    rawPrice: reqNumber,
    discount: {
        type: Object,
        properties: {
            type: Boolean,
            amount: Number,
        }
    }
})

const packageSchema = new mongoose.Schema({
    timestamp: reqNumber,
    code: reqString,
    service: {
        type: String,
        required: true,
        default: "correios",
        enum: ["correios"]
    }
})

const Schema = new mongoose.Schema({
    timestamp: reqNumber,
    store: reqObjectID,
    vendor: reqObjectID,
    description: String,
    status: {
        type: String,
        default: "new order",
        enum: ["new order", "in-production", "sended", "received"]
    },
    products: [productsSchema],
    packages: [packageSchema],
    client: {},
    Notification: {
        email: [{
            type: Object,
            properties:{
                address: String,
            }
        }]
    }
})

module.exports = mongoose.model("order", Schema)