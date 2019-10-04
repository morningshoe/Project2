var db = require("../models");


module.exports = function (app) {
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
    //get data
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
    callHome (function(doneHome) {
      res.render("home", {
      home: doneHome
    });
    });
  });
  
  app.get("/technology", function (req, res) {
      callTech (function(doneTech) {
                  res.render("technology", {
                  tech: doneTech
              });
              }); 
  });
  
  app.get("/business", function (req, res) {
      callBus (function(doneBus) {
          res.render("business", {
          bus: doneBus
      });
      }); 
  });
  
  app.get("/sports", function (req, res) {
      callSports (function(doneSports) {
          res.render("sports", {
          sports: doneSports
      });
      }); 
  });
  
  app.get("/entertainment", function (req, res) {
      callEnt (function(doneEnt) {
          res.render("entertainment", {
          ent: doneEnt
      });
      }); 
  });
  
  app.get("/health", function (req, res){
      callHealth (function(doneHealth) {
          res.render("health", {
          health: doneHealth
      });
      }); 
  });
  
  app.get("/blog", function (req, res){
    res.render("blog", {
    })
  });
};
