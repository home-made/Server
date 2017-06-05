const Router = require("express").Router();
const userController = require("../controllers/controller.user");

////////////////////////USER FUNCTIONS//////////////////////
//create new user
Router.post("/user/:id", userController.createUser);

//manage profile
Router.put("/user/:authId", userController.updateUser);

Router.get("/user/:id", userController.getUser);

Router.put("/user/sig", userController.addSignature);
module.exports = Router;
