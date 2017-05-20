const { Dish } = require("../db/Schema");

exports.updateDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndUpdate(query, req.body, { new: true }, (err, dish) => {
    if (err) return res.send(err);
    res.send(dish);
  });
};

exports.deleteDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndRemove(query, req.body, (err, dish) => {
    if (err) return res.send(err);
    res.status(200).send("successfully deleted ", dish);
  });
};

exports.addDish = (req, res) => {
  console.log(req.body);
  var dish = new Dish(req.body);
  dish.save((err, dish) => {
    if (err) return console.log(err);
    res.send(dish);
  });
};
