const { Order, User, Dish } = require("../db/Schema");
const SendMessage = require("../../utils/SendMessage");

exports.updateOrder = (req, res) => {
  var query = {};
  console.log("REQ IS", req.body); 
   query._id = req.body._id;

  console.log("QUERY IS", query);

  Order.findOneAndUpdate(query, { status: req.body.status }, { new: true })
    .then(order => {
      if (order.status === 1) {
        for (var dish in order.cart) {
          Dish.find({ _id: order.cart[dish].dish._id }).then(dishToUpdate => {
            var updateQuery = {
              quantity: dishToUpdate[0].quantity - order.cart[dish].amount
            };
            if (updateQuery.quantity <= 0) {
              updateQuery.isActive = false;
            }
            Dish.findOneAndUpdate({ _id: dishToUpdate[0]._id }, updateQuery, {
              new: true
            })
              .then(updatedDish => console.log("UPDATED DISH IS", updatedDish))
              .catch(err => console.log(err));
          });
        }
      }
      res.send(order);
    })
    .catch(err => console.log(err));
};


exports.alertChef = (order, socket, io) => {
  console.log("create room?", order);
  io.in(order.chefId).emit("message", "got a new order request chef");
};
exports.alertCustomer = (order, socket, io) => {
  console.log("create room?", order);
  io.in(order.customerId).emit("message", "got a new update on a order");
};

exports.getPendingOrders = (req, res) => {
  // console.log("getPendingOrders");
  console.log(req.params.id);

  var results = [];

  Order.find({ chefId: req.params.id, status: 0 })
    .then(orders => {
      // console.log('pending orders ', orders)
      results.push(orders);

      orders = orders.map(curr => {
        return { authId: curr.customerId };
      });

      User.find({ $or: orders })
        .then(user => {
          results.push(user);
          res.send(results);
        })
        .catch(err => {
          res.send({});
        });
    })
    .catch(err => {
      res.send({});
    });
};

//returning [[array of order],chef object]
exports.getUserCurrentOrder = (req, res) => {
  // console.log("getCurrentOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 0 })
    .then(orders => {
      // console.log('current order ', orders)
      results.push(orders);
      orders = orders.map(curr => {
        return { authId: curr.chefId };
      });
      User.find({ $or: orders })
        .then(user => {
          results.push(user);
          res.send(results);
        })
        .catch(err => {
          res.send({});
        });
    })
    .catch(err => {
      res.send({});
    });
};

exports.getAcceptedOrders = (req, res) => {
  // console.log("getAcceptedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 1 })
    .then(orders => {
      // console.log('accepted orders ', orders)
      results.push(orders);
      orders = orders.map(curr => {
        return { authId: curr.customerId };
      });
      User.find({ $or: orders })
        .then(user => {
          console.log("customers connected to orders", user);
          results.push(user);
          res.send(results);
        })
        .catch(err => {
          res.send({});
        });
    })
    .catch(err => {
      res.send({});
    });
};

exports.getCompletedOrders = (req, res) => {
  // console.log("getCompletedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 2 })
    .then(orders => {
      // console.log('completed orders ', orders)
      results.push(orders);
      orders = orders.map(curr => {
        return { authId: curr.customerId };
      });
      User.find({ $or: orders })
        .then(user => {
          results.push(user);
          res.send(results);
        })
        .catch(err => {
          res.send({});
        });
    })
    .catch(err => {
      res.send({});
    });
};

exports.getCancelledOrders = (req, res) => {
  // console.log(req.params.id);
  var results = [];
  Order.find({ chefId: req.params.id, status: 3 })
    .then(orders => {
      results.push(orders);
      orders = orders.map(curr => {
        return { authId: curr.customerId };
      });
      User.find({ $or: orders })
        .then(user => {
          results.push(user);
          res.send(results);
        })
        .catch(err => {
          res.send({});
        });
    })
    .catch(err => {
      res.send({});
    });
};

exports.postNewOrder = (req, res) => {
  console.log("the req.body inside postNewOrder is ", req.body);

  var order = new Order(req.body);
  order.save().then(order => {
    res.send(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find({})
    .then(allOrders => {
      res.send(allOrders);
    })
    .catch(err => {
      res.send("Could not find the orders");
    });

  /*
  var order = new Order(req.body);
  order.save().then(order => {
    res.send(order);
  });

*/
};

exports.getCustomerOrders = (req, res) => {
  Order.find({
    $or: [
      { customerId: req.params.id, status: 0 },
      { customerId: req.params.id, status: 1 },
      { customerId: req.params.id, status: 2 },
      { customerId: req.params.id, status: 3 }
    ]
  })
    .then(allOrders => {
      console.log("allOrders inside getCustomerOrders are ", allOrders)
      res.send(allOrders);
    })
    .catch(err => {
      res.send("Could not find the orders");
    });
  /*
  var order = new Order(req.body);
  order.save().then(order => {
    res.send(order);
  });
*/
};

//test route for sending nodemailer message
//delete in final app version.
exports.acceptOrder = (req, res) => {
  SendMessage(
    "Luke Skywalker",
    "jaimemendozadev@gmail.com",
    "Your Order Has Been Accepted!",
    "Your order has been accepted by the Chef you requested. Your order amount comes to $22. The chef's address has been attached to this email for your to pick up your food. Enjoy!"
  );
  res.send("An email confirmation has been sent to you");
};

/*
OrderSchema Status Codes
0: pending
1: accepted
2: completed
3: canceled
  
*/
