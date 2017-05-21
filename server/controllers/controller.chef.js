const { User, Dish } = require("../db/Schema");

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log(chefId);
  var results = []
  User.find({ authId: chefId, isChef: true }, (err, user) => {
    if (err) return res.send(err);
    results.push(user)
    // console.log(user)
    Dish.find({chefId: user[0].authId}, (err,dish) =>{
      console.log(dish)
       results.push(dish)
      res.send(results)
    })
  });
};

exports.updateChef = (req, res) => {
  res.send("update chef big fella");
};
exports.findChefs = (req, res) => {
  // var chefId =req.params.chefId;
  // console.log(chefId)
  User.find({ "location.geo_lat": "somewhere" }, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
};
