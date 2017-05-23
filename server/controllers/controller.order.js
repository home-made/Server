const { Order, User } = require("../db/Schema");

exports.updateOrder = (req, res) => {
  console.log("updateOrder");
  var query = { chefId: req.body.chefId };
  Order.findOneAndUpdate(query, req.body, { new: true }, (err, order) => {
    res.send(order);
  });
};

exports.getPendingOrders = (req, res) => {
  console.log("getPendingOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 0 }, (err, orders) => {
    results.push(orders);
    orders.forEach((order, ind) => {
      User.find({ authId: order.chefId }, (err, user) => {
        results.push(user);
        if (ind === orders.length - 1) res.send(results);
      });
    });
  });
};

exports.getAcceptedOrders = (req, res) => {
  console.log("getAcceptedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 1 }, (err, orders) => {
    results.push(orders);
    orders.forEach((order, ind) => {
      User.find({ authId: order.chefId }, (err, user) => {
        results.push(user);
        if (ind === orders.length - 1) res.send(results);
      });
    });
  });
};

exports.getCompletedOrders = (req, res) => {
  console.log("getCompletedOrders");
  var results = [];
  Order.find({ chefId: req.params.id, status: 2 }, (err, orders) => {
    results.push(orders);
    orders.forEach((order, ind) => {
      User.find({ authId: order.chefId }, (err, user) => {
        results.push(user);
        if (ind === orders.length - 1) res.send(results);
      });
    });
  });
};

exports.getCancelledOrders = (req, res) => {
  console.log(req.params.id);
  var results = [];
  Order.find({ chefId: req.params.id, status: 3 }, (err, orders) => {
    if(orders.length ===0) return res.send(orders)
    results.push(orders);
    orders.forEach((order, ind) => {
      User.find({ authId: order.chefId }, (err, user) => {
        results.push(user);
        if (ind === orders.length - 1) res.send(results);
      });
    });
  });
};

exports.postNewOrder = (req, res) => {
  var order = new Order(req.body);
  order.save((err, order) => {
    res.send(order);
  });
};
