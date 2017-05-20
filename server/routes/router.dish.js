const Router = require('express').Router();
const dishController = require('../controllers/controller.dish.js');

////////////////////////USER PROFILE//////////////////////
//manage profile
Router.put('user/:userId')


////////////////////////CHEF PROFILE//////////////////////

//manage profile
Router.put('/chef/:chefId')

//post new dish
Router.post('/dish/add')

//get all of a chef's dishes 
Router.get('/dish/:dishId')

//update a dish
Router.put('/dish/:id')


////////////////////////ORDERS//////////////////////
//get active orders
Router.get('orders/:id')

//get inactive orders
Router.get('inactive/:id')


////////////////////////USER//////////////////////
Router.get('/localchefs/')

//get chef + dishes
Router.get('/chef/:chefId')

//find chefs by style
get('style/:id')

//get chef and its dishes
get('/chef/:chefId')

//get chef reviews
get('review/:type/:id')

//post new order request
post('/order/')


////////////////////////CHEF//////////////////////
//get list of pending requests
get('/orders/')

//chef manage order- accept,deny,mark as complete
put('/order/')

//get customer reviews
// get('/review/:type')

////////////////////////CHEF & USER//////////////////////

//post chef or customer review
post('/review/:type/:id')

