const Router = require("express").Router();

const orderController = require("../controllers/controller.order");


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

module.exports = Router;