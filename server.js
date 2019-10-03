var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var path = require("path");
var request = require('request');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3030;

//Body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));


app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//API Keys
function callTech (finishedTech) {
    request("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=bae0f0bd96534d62b77172d660788633", { json:true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            finishedTech(body.articles);
        };
    });    
};

//Calling business API
function callBus (finishedBus) {
    request("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bae0f0bd96534d62b77172d660788633", { json:true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            finishedBus(body.articles);
        };
    });    
};

//Calling Sports API
function callSports (finishedSports) {
    request("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=bae0f0bd96534d62b77172d660788633", { json:true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            finishedSports(body.articles);
        };
    });    
};

//Calling Entertainment API
function callEnt (finishedEnt) {
    request("https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=bae0f0bd96534d62b77172d660788633", { json:true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            finishedEnt(body.articles);
        };
    });    
};


//Calling Health API
function callHealth (finishedHealth) {
    request("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=bae0f0bd96534d62b77172d660788633", { json:true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            finishedHealth(body.articles);
        };
    });    
};


//Set Handlebar routes 
app.get("/home.html", function (req, res) {
    res.render("home");
});

app.get("/technology.html", function (req, res) {
    callTech (function(doneTech) {
                res.render("technology", {
                tech: doneTech
            });
            }); 
});

app.get("/business.html", function (req, res) {
    callBus (function(doneBus) {
        res.render("business", {
        bus: doneBus
    });
    }); 
});

app.get("/sports.html", function (req, res) {
    callSports (function(doneSports) {
        res.render("sports", {
        sports: doneSports
    });
    }); 
});

app.get("/entertainment.html", function (req, res) {
    callEnt (function(doneEnt) {
        res.render("entertainment", {
        ent: doneEnt
    });
    }); 
});

app.get("/health.html", function (req, res){
    callHealth (function(doneHealth) {
        res.render("health", {
        health: doneHealth
    });
    }); 
});

app.use(express.static(path.join(__dirname, 'public')));
require("./routes/htmlRoutes")(app)
app.listen(PORT, () => console.log("Server listening on port " + PORT));