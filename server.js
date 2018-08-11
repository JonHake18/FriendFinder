//---------------------------------------------------------------------
//Setting variables for required dependencies
//---------------------------------------------------------------------
var express = require("express");
var bodyParser = require("body-parser");

//---------------------------------------------------------------------
//Initializing express server
//---------------------------------------------------------------------
var app = express();

//---------------------------------------------------------------------
//Setting variable for the port required to access the express server
//---------------------------------------------------------------------
var PORT = process.env.PORT || 8080;

//---------------------------------------------------------------------
//Integrates bodyparser into the express server
//---------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));

//---------------------------------------------------------------------
//Used to setup a router in order to handle the necessary routes
//---------------------------------------------------------------------
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoute")(app);

//--------------------------------------------------------------------
//Sets the app listener to the defined port variable above
//---------------------------------------------------------------------
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});