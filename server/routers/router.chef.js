const Router = require("express").Router();
const chefController = require("../controllers/controller.chef");

//get chef + dishes
Router.get("/chef/:chefId", chefController.getChefDetails);
Router.get("/chef/", chefController.findChefs);

module.exports = Router;