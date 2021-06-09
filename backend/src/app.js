const express = require('express')
const routes = require('./routes')
const { errors } = require('celebrate')
const cors = require('cors')  
const sanitize = require("mongo-sanitize")

const app = express()

app.use(cors({
    //origin: "http://..."
}))

// Realiza a sanitarização do inputs do font-end
app.use(function (req, res, next) {
    req.params = sanitize(req?.params)
    req.body = sanitize(req?.body)
    next()
});

app.use(express.json())
app.use(routes)


app.use(errors())


module.exports = app