const mongodbclient = require('../mongodb')

databaseToUse = "mypackage"

async function connectdb(dbName, collectionName){
    mongodbclient.connect(err => {
        const db = mongodbclient.db(dbName);
        const collection = db.collection(collectionName)

        return {
            "db": db,
            "collection": collection,
            "close": mongodbclient.close
        }      
    });    
}

async function  createUser(req,res) {
    

    
    const collection = db.collection("user")
    const result = await collection.insertMany([userData])
    console.log(result.insertedCount)
    end()
    return result.insertedCount
}
/*

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
  

*/


module.exports = {
    async create(req, res) {
        const { first_name, last_name, email, password } = req.body
        console.log(await connectdb("mypackage","user"))
        //await connectdb()
        
        return res.send("none")
    }
}