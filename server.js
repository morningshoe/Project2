var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var path = require("path");
app.use(express.json())
require("./routes/htmlRoutes")(app)
require("./routes/api/api-post-routes")(app)
var PORT = process.env.PORT || 3030;
var db = require("./models");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");




app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync()
    .then(function(){
        app.listen(PORT, () => console.log("Server listening on port " + PORT));
})