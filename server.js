// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var gameState = {
    player1: {
        token: 8383333,
        left: 1,
        right: 1
    },
    player2: {
        token: 8290202,
        left: 1,
        right: 1
    }
}

var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.post('/turn',function(req, res) {
    gameState = req.body;
    console.log(req.body);
    var temp = gameState.me;
    gameState.me = gameState.opponent;
    gameState.opponent = temp;
    console.log("We got a post request over here");
});

router.get('/player', function(req, res){
    res.json(gameState);
    console.log("We got a get request over here");
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);






