var express = require("express");
var app = express();

app.set("view engine", "html");

app.use(express.static(__dirname + '/src'));


app.get("/", function(req, res){
  res.render("src/index");
});

app.listen(process.env.PORT, process.env.IP, function() {
        console.log("Server is running!");
});
