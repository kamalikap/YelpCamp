var express= require("express");
var app= express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds= [
        {name: "Salmon Creek", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"},
        {name: "Granite hill", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"},
        {name: "hjhjhjk", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"},
        {name: "bjhbjh", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"},
        {name: "bjhbjh", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"},
        {name: "hiuhui", image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg"}
        ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds") ;
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!");
});