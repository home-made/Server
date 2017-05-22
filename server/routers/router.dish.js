const Router = require("express").Router();
const userController = require("../controllers/controller.user");
const dishController = require("../controllers/controller.dish");
const chefController = require("../controllers/controller.chef");
const orderController = require("../controllers/controller.order");
const reviewController = require("../controllers/controller.review");
console.log(userController);
////////////////////////USER FUNCTIONS//////////////////////
//create new user
Router.post("/user/", userController.createUser);

//manage profile
Router.put("/user/", userController.updateUser);

//get chef + dishes
Router.get("/chef/:chefId", chefController.getChefDetails);
Router.get("/chef/", chefController.findChefs);

//manage/update profile
// Router.put("/chef/:chefId", chefController.updateChef);

////////////////////////CHEF FUNCTIONS//////////////////////

//post new dish
Router.post("/dish/add", dishController.addDish);

//update a dish
Router.put("/dish", dishController.updateDish);

//update a dish
Router.delete("/dish", dishController.deleteDish);

////////////////////////ORDERS//////////////////////

//get pending orders
Router.get("/orders/0/:id", orderController.getPendingOrders);
// //get accepted orders
Router.get("/orders/1/:id", orderController.getAcceptedOrders);
// //get completed orders
Router.get("/orders/2/:id", orderController.getCompletedOrders);
// //get cancelled orders
Router.get("/orders/3/:id", orderController.getCancelledOrders);

//chef update order- accept,deny,mark as complete
Router.put("/orders/", orderController.updateOrder);

//post new order request
Router.post("/orders/", orderController.postNewOrder);

////////////////////////USER//////////////////////
//find chefs by style
Router.get("/chef/style/:id", chefController.findChefs);

////////////////////////REVIEW//////////////////////
//get chef(0) or user(1) reviews
Router.get("/reviews/0/:id", reviewController.getChefReviews);

Router.get("/reviews/1/:id", reviewController.getUserReviews);

//post chef(0) or user(1)  review
Router.post("/reviews/0/:id", reviewController.postChefReview);
Router.post("/reviews/1/:id", reviewController.postUserReview);


module.exports = Router;
