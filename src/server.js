
// BASE SETUP
// =============================================================================
var express = require("express");
var multer = require("multer");
var bodyParser = require('body-parser');

// swagger
var swaggerUi = require('swagger-ui-express'); // swagger tutorial: https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b, https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/
var swaggerDocument = require('./swagger.json'); // swagger editor: http://editor.swagger.io/

// configs
var config = require('config');
const APIEndpoint = config.get('APIEndpoint'); // dev vs prod vars: https://github.com/lorenwest/node-config

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

app.use(function(req, res, next ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.send({message: `You are at the root of the server. See swagger docs: ${APIEndpoint}/api-docs`});
});

const fileUploadParameter = "fileToUpload";
const fileUploadDestinationFolder = "./uploads/";
router.post("/file", multer({ dest: fileUploadDestinationFolder}).array(fileUploadParameter, 12), function(req, res) {
    res.send(req.files);
})

router.get("/health", function(req, res){
    res.send({message: 'Service is healthy and available'}); // return 200 OK http://expressjs.com/en/4x/api.html#res.end
});

// more routes for our API will happen here



// REGISTER OUR ROUTES 
// =============================================================================
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
var port = process.env.PORT || 3000;        // set our port
var server = app.listen(port, function () {
    console.log(`APIEndpoint: ${APIEndpoint}`)
    console.log(`Swagger page: ${APIEndpoint}/api-docs`)
    console.log("Listening on port %s...", server.address().port);
})
