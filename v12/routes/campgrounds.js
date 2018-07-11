var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// INDEX- show all campgrounds
router.get("/", function(req, res){
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    // Get all campgrounds from DB
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allCampgrounds){
        Campground.count().exec(function (err, count) {
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds, current: pageNumber, pages: Math.ceil(count / perPage)});
            }
        });
    });
});


// CREATE- ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from and add to campgrounds array.
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price: price, image:image, description:desc, author:author};
    // Create a new campground and save to DB.
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            req.flash("success", "Congratulations on new Campground!")
            res.redirect("/campgrounds");
        }
    });
});


// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground:foundCampground});
        }
   });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


// UPDATE ROUTE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // req.body.campground.body = req.sanitize(req.body.campground.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
   
});


// DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;