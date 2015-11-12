var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//endpoint that finds all the nearby strikes for each strike, and sends back a modified object with a new "nearbyStrikes" object tied to each strike
app.post('/analyzeData', function (req, res) {
  var strikes = req.body.strikes;
  findNearbyStrikes(strikes);
  res.send(strikes);
})


app.listen(3000);

//helper function that calculates all of the nearby strikes for each strike
var findNearbyStrikes = function findNearbyStrikes(strikes) {
  for (var i = 0; i < strikes.length; i++) {
    var strikesWithin10000m = 0;
    var strikesWithin5000m = 0;
    var strikesWithin1000m = 0;
    var strikesWithin100m = 0;
    var strikesWithin10m = 0;
    for (var j = 0; j < strikes.length; j++) {
      if (j === i) continue;
      var distance = calcDistance(strikes[i].lat, strikes[i].lon, strikes[j].lat, strikes[j].lon);
      
      if (distance < 1000) {
        strikesWithin1000m++;
      }
      if (distance < 5000) {
        strikesWithin5000m++;
      }
      if (distance < 10000) {
        strikesWithin10000m++;
      }
    }
    strikes[i].nearbyStrikes = {
      strikesWithin1000m: strikesWithin1000m, 
      strikesWithin5000m: strikesWithin5000m,
      strikesWithin10000m: strikesWithin10000m,
    }
  }
}

//implemented from https://en.wikipedia.org/wiki/Great-circle_distance
//returns distance in km
var calcDistance = function calcDistance(lat1, lon1, lat2, lon2){
  var c = Math.PI/180;
  lat1 = lat1*c;
  lat2 = lat2*c;
  lon1 = lon1*c;
  lon2 = lon2*c;
  return 6371000 * 2 * Math.asin(Math.sqrt(
      Math.sin((lat2-lat1) / 2) * Math.sin((lat2-lat1) / 2) + Math.cos(lat1)*Math.cos(lat2)*
      Math.sin((lon2-lon1) / 2) * Math.sin((lon2-lon1) / 2)
    ));
}
