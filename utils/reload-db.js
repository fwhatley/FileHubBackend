// require/import the mongodb native drivers
var mongodb = require('mongodb');

// we need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// connection string url. This is where mongodb server is running
var url = "ds151382.mlab.com:51382/file-hub-backend -u admin -p a1234567.";

// connect to the server
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url)

        // do some stuff her

        // close connection
        db.close();
    }
});




