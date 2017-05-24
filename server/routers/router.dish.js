const Router = require("express").Router();
const dishController = require("../controllers/controller.dish");

//post new dish
Router.post("/dish/add", dishController.addDish);

//update a dish
Router.put("/dish", dishController.updateDish);

//delete a dish
Router.delete("/dish", dishController.deleteDish);

module.exports = Router;
