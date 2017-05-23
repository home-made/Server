const { User, Dish } = require("../db/Schema");

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log(chefId);
  var results = [];
  User.find({ authId: chefId, isChef: true }, (err, user) => {
    if (err) return res.send(err);
    results.push(user);
    Dish.find({ chefId: user[0].authId }, (err, dish) => {
      console.log(dish);
      results.push(dish);
      res.send(results);
    });
  });
};

exports.updateChef = (req, res) => {
  res.send("update chef big fella");
};

exports.findChefs = (req, res) => {
  // var chefId =req.params.chefId;
  console.log(req.body);
  User.find({ "location.geo_lat": "somewhere" }, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
};

exports.findChefsByStyle = (req, res) => {
  // var chefId =req.params.chefId;
  console.log(req.body);
  Dish.find(
    { isActive: true, cuisineType: req.params.styleId },
    (err, dishes) => {
      if (err) return res.send(err);
      var chefs = [];
      dishes.forEach((curr, inx) => {
        User.find({ authId: curr.chefId }, (err, chef) => {
          res.send(chef);
          chefs.push(chef);
          if (inx === dishes.length - 1) res.send(chefs);
        });
      });
    }
  );
};
