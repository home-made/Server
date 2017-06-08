require("dotenv").load();
const express = require("express");
const path = require("path");
const parser = require("body-parser");
const db = require("./db/db");
var redis = require('redis');
var orderController = require('./controllers/controller.order')
// var client = require('redis-connection')('subscriber'); // require & connect 
const {
  User,
  ActiveDish,
  Order,
  InactiveDish,
  Review
} = require("./db/Schema");

// client.set('dish', 'dish', ()=> console.log('saved'));

const app = express();
const {Server} = require('http')
const server = Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) =>{
  console.log('connection')
  // socket.broadcast.to(socket.id).emit('message', 'bruja');
  socket.emit('init','im here big fella - server')
  // socket.emit('message','im here big fella - server')
  socket.on('disconnect', ()=>{
    console.log('im out')
  })
  socket.on('newchef', (chef)=>{
    console.log('chef joined',chef)
    socket.join(chef.authId)
  })
  socket.on('newcustomer', (customer)=>{
    console.log('customer joined',customer)
    socket.join(customer.authId)
  })
  socket.on('newOrderUpdate', (order)=>{
    console.log(order)
    // socket.broadcast('knock it off')
    socket.join(order.customerId);
    orderController.alertCustomer(order,socket,io)
  })
  socket.on('newOrderRequest', (order)=>{
    console.log('socket recieved order ',order)
    socket.join(order.chefId);
    orderController.alertChef(order,socket,io)
  })

})

app.use(parser.json());
app.use(require("./routers/router.dish"));
app.use(require("./routers/router.user"));
app.use(require("./routers/router.order"));
app.use(require("./routers/router.chef"));
app.use(require("./routers/router.review"));



app.use(parser.urlencoded({ extended: true }));

app.get('/api/',(req,res)=>{
  res.send({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
  });
});
app.use(parser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {});
  } else {
    next();
  }
});

server.listen(3000, console.log("Listening on 3000"));

module.exports = app;
