const Router = require("express").Router();
const userController = require("../controllers/controller.user");
const dishController = require("../controllers/controller.dish");
const chefController = require("../controllers/controller.chef");
const orderController = require("../controllers/controller.order");
const reviewController = require("../controllers/controller.review");

////////////////////////USER FUNCTIONS//////////////////////
//manage profile
Router.put("user/:userId", userController.updateUser);

//get chef + dishes
Router.get("/chef/:chefId", chefController.getChefDetails);

//manage/update profile
Router.put("/chef/:chefId", chefController.updateChef);

////////////////////////CHEF FUNCTIONS//////////////////////

//post new dish
Router.post("/dish/add", dishController.addDish);

//update a dish
Router.put("/dish/:id", dishController.updateDish);

////////////////////////ORDERS//////////////////////
//get active orders
Router.get("/orders/:id", orderController.getActiveOrders);

//get inactive orders
Router.get("/orders/all/:id", orderController.getAllOrders);

//get list of pending requests
Router.get("/orders/", orderController.getOrders);

//chef manage order- accept,deny,mark as complete
Router.put("/orders/", orderController.updateOrder);

//post new order request
Router.post("/orders/", orderController.postNewOrder);

////////////////////////USER//////////////////////
//find chefs by style
Router.get("/chef/style/:id", chefController.findChefs);

//get chef or user reviews
Router.get("/review/:type/:id", reviewController.getReviews);

//post chef or customer review
Router.post("/review/:type/:id", reviewController.postReview);

module.exports = Router;