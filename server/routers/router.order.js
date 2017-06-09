const Router = require("express").Router();

const orderController = require("../controllers/controller.order");

////////////////////////ORDERS//////////////////////

//get pending orders
Router.get("/orders/0/:type/:id/", orderController.getPendingOrders);
// //get accepted orders
Router.get("/orders/1/:type/:id/", orderController.getAcceptedOrders);
// //get completed orders
Router.get("/orders/2/:type/:id/", orderController.getCompletedOrders);
// //get cancelled orders
Router.get("/orders/3/:type/:id/", orderController.getCancelledOrders);

//chef update order- accept,deny,mark as complete
Router.put("/orders/", orderController.updateOrder);

//get orders from customer with specific id
Router.get("/orders/:id/", orderController.getCustomerOrders);

//post new order request
Router.post("/orders/", orderController.postNewOrder);

Router.get("/orders/", orderController.getAllOrders);

//test route
Router.put("/orders/1/:id", orderController.acceptOrder);

module.exports = Router;
