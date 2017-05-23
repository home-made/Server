const Router = require("express").Router();
const reviewController = require("../controllers/controller.review");

////////////////////////REVIEW//////////////////////
//get chef(0) or user(1) reviews
Router.get("/reviews/0/:id", reviewController.getChefReviews);

Router.get("/reviews/1/:id", reviewController.getUserReviews);

//post chef(0) or user(1)  review
Router.post("/reviews/0/:id", reviewController.postChefReview);
Router.post("/reviews/1/:id", reviewController.postUserReview);

module.exports = Router;