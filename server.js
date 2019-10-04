var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var path = require("path");
require("./routes/htmlRoutes")(app)
require("./routes/api/api-post-routes")(app)
var PORT = process.env.PORT || 3030;


app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");




app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log("Server listening on port " + PORT));