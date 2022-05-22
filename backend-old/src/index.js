require('dotenv').config()
const app = require('./app')

const mongoose = require('mongoose');

const uri = process.env.DB_URL;

mongoose.set('returnOriginal', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connected to mongodb!!!")
})

console.log(`Server starting in : ${process.env.SERVER_BASE_URL}:${process.env.SERVER_PORT}/`)
app.listen(process.env.SERVER_PORT)
