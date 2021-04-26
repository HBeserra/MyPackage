require('dotenv').config()
const app = require('./app')

const mongoose = require('mongoose');
const password = "wHh5Tg6Yesf3kTCR" 

const uri = `mongodb+srv://dbApp:${password}@cluster0.v8url.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.set('returnOriginal', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connected to mongodb!!!")
})

console.log(`Server starting in : ${process.env.SERVER_LINK}/`)
app.listen(process.env.SERVER_PORT)
