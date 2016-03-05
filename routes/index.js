var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});

router.get('/getCity', function(req, res) {
	console.log("Inside Get City");
	console.log(req.query);
	if(req.query.q != "") {
		var myRe = new RegExp("^" + req.query.q);
		fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
			if(err) throw err;
            var cities = data.toString().split("\n");
			var jsonresult = [];
            for(var i = 0; i < cities.length; i++) {
				var result = cities[i].search(myRe);
				if (result != -1) {
					console.log(cities[i]);
					jsonresult.push({city:cities[i]});
				}
            }
			console.log(jsonresult);
			console.log(JSON.stringify(jsonresult));
			res.writeHead(200);
			res.end(JSON.stringify(jsonresult));
        }) 
		} else {
			res.status(200).json([]);
		}
});

router.get('/dictionary', function(req, res) {
	console.log("Inside Dictionary");
	console.log(req.query);
	if(req.query.q != "") {
		var myReb = new RegExp("^" + req.query.q);
		fs.readFile(__dirname + '/dictionary.txt',function(err,data) {
			if(err) throw err;
            var words = data.toString().split("\n");
			var jsonresultb = [];
            for(var i = 0; i < words.length; i++) {
				var result = words[i].search(myReb);
				if (result != -1) {
					console.log(words[i]);
					jsonresultb.push({word:words[i]});
				}
            }
			console.log(jsonresultb);
			console.log(JSON.stringify(jsonresultb));
			res.writeHead(200);
			res.end(JSON.stringify(jsonresultb));
        }) 
		} else {
			res.status(200).json([]);
		}
});
module.exports = router;
