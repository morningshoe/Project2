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
};
