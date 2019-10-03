var db = require("../../models");

module.exports = function(app) {
  app.get("/api/categories", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // Including db.Post
    db.Category.findAll({
      include: [db.Post]
    }).then(function(dbCategory) {
      res.json(dbCategory);
      console.log(db.Category);
    });
  });

  app.get("/api/categories/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.post("/api/categories", function(req, res) {
    db.Category.create(req.body).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.delete("/api/categories/:id", function(req, res) {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

};
