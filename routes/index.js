var express = require('express');
var router = express.Router();
var API = require('../qpx-mod');
 
var apiKey = 'AIzaSyAPU8nva5EMhtBencz7XL9qdz1AtzldEus';
var qpx = new API(apiKey);
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', isGet: true});
});

router.post('/', function (req, res) {
    var body = {
	"request": {
	    "passengers": { "adultCount": 1 },
	    "slice": [{
	        "origin": req.body.origin,
	        "destination": req.body.destination,
	        "maxStops": req.body.maxStops,
	        "preferredCabin": "COACH",
	        "date": req.body.departDate // YYYY-MM-DD 
	      },
	      {
	        "origin": req.body.destination,
	        "destination": req.body.origin,
            "maxStops": req.body.maxStops,
            "preferredCabin": "COACH",
	        "date": req.body.returnDate // YYYY-MM-DD 
	      }
	    ],	
	    "solutions": 10
	  }
	};
 
	qpx.getInfo(body, function(error, data){
		res.render('index', { title: 'Result', isGet: false, queryRes: data });
        console.log (data.tripOption)
	});
});

module.exports = router;
