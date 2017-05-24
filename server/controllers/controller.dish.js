const { Dish } = require("../db/Schema");

exports.updateDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndUpdate(query, req.body, { new: true })
    .then(dish => {
      res.send(dish);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndRemove(query, req.body)
    .then(dish => {
      res.status(200).send("successfully deleted ", dish);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addDish = (req, res) => {
  var dish = new Dish(req.body);
  dish
    .save()
    .then(dish => {
      console.log("dish added", dish);
      res.send(dish);
    })
    .catch(err => {
      console.log(err);
    });
};
