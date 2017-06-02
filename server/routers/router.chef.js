const Router = require("express").Router();
const chefController = require("../controllers/controller.chef");

//get chef + dishes
Router.get("/chef/:chefId", chefController.getChefDetails);
Router.get("/chef/", chefController.findChefs);

//test route for map component - remove in final version
Router.get("/chefTest/", chefController.findChefsTest);

//find chefs by style
Router.get("/chef/style/:styleId", chefController.findChefsByStyle);

Router.post("/text/", chefController.textChef);
module.exports = Router;