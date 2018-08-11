
var friendData = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {
    var comparisonArray = [];
    var differenceArray = [];
    var userInput = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    userInput.scores = scoresArray;
    
    for (i = 0; i < friendData.length; i++) {
      differenceArray.push(Math.abs(userInput[i].scores - friendData[i].scores))
      var totalDifference = differenceArray.reduce(function (a, b) {
        return a + b;
      });
      comparisonArray.push(totalDifference);
      differenceArray = [];
    };
    comparisonArray.sort(function (a, b) { return b.scoreDifference - a.scoreDifference; });
  });
};