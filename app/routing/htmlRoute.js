//-------------------------------------------------------
// Sets a variable for the required path dependency
//-------------------------------------------------------
var path = require("path");


//-------------------------------------------------------
// Sets up the function for app that will handle routing
//-------------------------------------------------------

module.exports = function (app) {
  //-------------------------------------------------------
  // HTML get requests to establish routes
  // These routes will display the corresponding html page
  //-------------------------------------------------------

  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // If no matching route is found default to home
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};