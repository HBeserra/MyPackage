const MongoClient = require('mongodb').MongoClient;

const password = "wHh5Tg6Yesf3kTCR"

const uri = `mongodb+srv://dbApp:${password}@cluster0.v8url.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;