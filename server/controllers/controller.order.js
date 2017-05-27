const { Order, User } = require("../db/Schema");

exports.updateOrder = (req, res) => {
  console.log("updateOrder");
  var query = { chefId: req.body.chefId };
  Order.findOneAndUpdate(query, req.body, { new: true }).then(order => {
    res.send(order);
  });
};

//returning [[array of order],chef object]
exports.getPendingOrders = (req, res) => {
  console.log("getPendingOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 0 })
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

//returning [[array of order],chef object]
exports.getUserCurrentOrder = (req, res) => {
  console.log("getPendingOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 0 })
    .then(orders => {
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
  console.log("getAcceptedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 1 })
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

exports.getCompletedOrders = (req, res) => {
  console.log("getCompletedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 2 })
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

exports.getCancelledOrders = (req, res) => {
  console.log(req.params.id);
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
  console.log("the req.body inside postNewOrder is ", req.body)

  var order = new Order(req.body);
  order.save().then(order => {
    res.send(order);
  });

 
};


exports.getAllOrders = (req, res) => {
  Order.find({})
    .then(allOrders =>{
      res.send(allOrders);
    })
    .catch(err => {
      res.send("Could not find the orders");
    })

/*
  var order = new Order(req.body);
  order.save().then(order => {
    res.send(order);
  });

*/  
};
