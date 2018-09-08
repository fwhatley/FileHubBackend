var express = require("express");
var multer = require("multer");
var app = express();

var swaggerUi = require('swagger-ui-express'); // swagger tutorial: https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b, https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/
var swaggerDocument = require('./swagger.json'); // swagger editor: http://editor.swagger.io/

var config = require('config');
const APIEndpoint = config.get('APIEndpoint'); // dev vs prod vars: https://github.com/lorenwest/node-config

// Set up endpoints
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res, next ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const fileUploadParameter = "fileToUpload";
const fileUploadDestinationFolder = "./uploads/";
app.post("/file", multer({ dest: fileUploadDestinationFolder}).array(fileUploadParameter, 12), function(req, res) {
    res.send(req.files);
})

app.get("/health", function(req, res){
    res.send({message: 'Service is healthy and available'}); // return 200 OK http://expressjs.com/en/4x/api.html#res.end
});

app.get("/*", function(req, res){
    res.send({message: `You are at the root of the server. See swagger docs: ${APIEndpoint}/api-docs`});
});

// Serve app
const port = 3000;
var server = app.listen(process.env.PORT || port, function () {
    console.log(`APIEndpoint: ${APIEndpoint}`)
    console.log("Listening on port %s...", server.address().port);
})
