// require/import the mongodb native drivers
var mongodb = require('mongodb');

// we need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// connection string url. This is where mongodb server is running
var CONNECTION_STRING = process.env.FILE_HUB_CONNECTION_STRING;

// connect to the server
MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log(`Connection established to: FILE HUB DB. :) ${db}`);

        // do some stuff her
        var setup
        db.db('file-hub-backend').createCollection("cussdfaftomers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
          });

        // close connection
        db.close();
    }
});




