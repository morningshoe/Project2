var db = require("../models");
var request = require('request');
var bodyParser = require('body-parser');


module.exports = function (app) {
  //Body-parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  // Load blog page

  app.get("blog", function (req, res) {
    db.Post.findAll({})
      .then(function (results) {
        var object = {
          post: results
        }
        res.render("blog", object);
      });
  });

  // Load example page and pass in a post by id
  app.get("/blog-post/:id", function (req, res) {
    db.Post.findOne({
      where: { id: req.params.id },
      include: [db.Author]
    })
      .then(function (results) {
        // showvdata
        res.render("postbyid", {
          blog: results
        });
      });
  });


  //Set Handlebar routes 
  app.get("/", function (req, res) {
    callHome(function (doneHome) {
      db.Post.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      })
        .then(function (results) {
          res.render("home", {
            blog: results,
            home: doneHome
          });
        });
    });
  });

app.get("/technology", function (req, res) {
  callTech(function (doneTech) {
    res.render("technology", {
      tech: doneTech
    });
  });
});

app.get("/business", function (req, res) {
  callBus(function (doneBus) {
    res.render("business", {
      bus: doneBus
    });
  });
});

app.get("/sports", function (req, res) {
  callSports(function (doneSports) {
    res.render("sports", {
      sports: doneSports
    });
  });
});

app.get("/entertainment", function (req, res) {
  callEnt(function (doneEnt) {
    res.render("entertainment", {
      ent: doneEnt
    });
  });
});

app.get("/health", function (req, res) {
  callHealth(function (doneHealth) {
    res.render("health", {
      health: doneHealth
    });
  });
});

  app.get("/blog", function (req, res) {
    res.render("blog", {
    })
  });
};

//API Keys
function callTech(finishedTech) {
  request("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedTech(body.articles);
    };
  });
};

//Calling business API
function callBus(finishedBus) {
  request("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedBus(body.articles);
    };
  });
};

//Calling Sports API
function callSports(finishedSports) {
  request("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedSports(body.articles);
    };
  });
};

//Calling Entertainment API
function callEnt(finishedEnt) {
  request("https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedEnt(body.articles);
    };
  });
};


//Calling Health API
function callHealth(finishedHealth) {
  request("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedHealth(body.articles);
    };
  });
};

//Calling API for home page
function callHome(finishedHome) {
  request("https://newsapi.org/v2/top-headlines?country=us&apiKey=bae0f0bd96534d62b77172d660788633", { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (res.statusCode === 200) {
      finishedHome(body.articles);
    };
  });
};

