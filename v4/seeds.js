var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment= require("./models/comment");

var data = [
    {
        name: "Cloud's rest",
        image:"http://www.pineviewcampgrounds.com/images/header/pinetrees600.jpg",
        description: "Blah blah blah"
    },
    
    {
        name: "Dessert",
        image:"https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Blah blah blah"
    },
    
    {
        name: "Trees",
        image:"https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Blah blah blah"
    }
    
    ]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
         console.log("removed campgrounds");
         Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                         console.log("added a campground");
                        //   create a comment
                        Comment.create(
                            {
                                text: "this place is great but no internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                                
                            });
                    }
                   
                });
            });
         });
    });
    
}

module.exports = seedDB;