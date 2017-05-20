const { CustomerReview,ChefReview,User } = require("../db/Schema");

exports.getChefReviews = (req, res) => {
  ChefReview.find({revieweeId: req.params.id},(err,reviews)=>{
    var users = []
    var answer = reviews.forEach((curr,inx) =>{
      User.find({authId: curr.reviewerId},(err,user) => {
        users.push(user)
        if(inx === reviews.length-1){
         res.send({reviews: reviews, users: users})
        }
      })
    })
  })
};

exports.getUserReviews = (req, res) => {
  CustomerReview.find({revieweeId: req.params.id},(err,reviews)=>{
    var users = []
    var answer = reviews.forEach((curr,inx) =>{
      User.find({authId: curr.reviewerId},(err,user) => {
        users.push(user)
        if(inx === reviews.length-1){
         res.send({reviews: reviews, users: users})
        }
      })
    })
  })
};

exports.postUserReview = (req, res) => {
    CustomerReview.create(req.body,(err,review)=>{
    res.send(review)
  })
  // res.send("post review big fella");
};

exports.postChefReview = (req, res) => {
    ChefReview.create(req.body,(err,review)=>{
    res.send(review)
  })
  // res.send("post review big fella");
};