const { Order } = require("../db/Schema");

exports.updateOrder = (req, res) => {
  var query = { chefId: req.body.chefId };
  Order.findOneAndUpdate(query, req.body, { new: true }, (err, order) => {
    res.send(order);
  });
};

exports.getPendingOrders = (req, res) => {
  console.log(req.params.id);
  Order.find({ chefId: req.params.id, status: 0 }, (err, orders) => {
    res.send(orders);
  });
};

exports.getAcceptedOrders = (req, res) => {
  console.log(req.params.id);
  Order.find({ chefId: req.params.id, status: 1 }, (err, orders) => {
    res.send(orders);
  });
};

exports.getCompletedOrders = (req, res) => {
  console.log(req.params.id);
  Order.find({ chefId: req.params.id, status: 2 }, (err, orders) => {
    res.send(orders);
  });
};

exports.getCancelledOrders = (req, res) => {
  console.log(req.params.id);
  Order.find({ chefId: req.params.id, status: 3 }, (err, orders) => {
    res.send(orders);
  });
};

exports.postNewOrder = (req, res) => {
  var order = new Order(req.body);
  order.save((err, order) => {
    res.send(order);
  });
};
