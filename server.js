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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//---------------------------------------------------------------------
//Used to setup a router in order to handle the necessary routes
//---------------------------------------------------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//--------------------------------------------------------------------
//Sets the app listener to the defined port variable above
//---------------------------------------------------------------------
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});