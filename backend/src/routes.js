const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const mongodbclient = require('./mongodb');
const client = require('./mongodb');
const assert = require('assert');

const routes = express.Router()

routes.get('/status', function (req, res) {
    res.send('online')
    console.log(mongodbclient)
    mongodbclient.connect(err => {
        const db = mongodbclient.db("test");
        // perform actions on the collection object
        insertDocuments(db, function() {
          client.close()
        })

      });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

module.exports = routes;