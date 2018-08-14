var friends = require("../data/friends");
var questions = require("../data/questions");

module.exports = function(app) {
    app.get("/data/friends", function(req, res) {
        return res.json(friends);
      });
    app.get("/data/questions", function(req, res) {
        return res.json(questions);
      });
    app.post("/data/friends", function(req, res) {
        var newFriendScoresArray=req.body.scores
        var friendComparisons= []
        for(i=0;i<friends.length; i++){
          comparisons=[]
          for(j=0;j<friends[i].scores.length; j++){
            
            comparison=Math.abs(friends[i].scores[j]-newFriendScoresArray[j])
            comparisons.push(comparison) 
          }
            summedComparisons =comparisons.reduce(function(total,number){
              return total + number
            })
            friendComparisons.push(summedComparisons);
        }
        bestMatchValue=Math.min.apply(null,friendComparisons)
        bestMatchIndex=friendComparisons.indexOf(bestMatchValue)
        bestMatch = friends[bestMatchIndex]
        var newFriend = req.body;
        console.log(newFriend);
        friends.push(newFriend);
        res.json(bestMatch);
    });
}