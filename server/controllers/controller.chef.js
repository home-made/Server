const { User, Dish } = require("../db/Schema");

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log(chefId);
  User.find({ authId: chefId }, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
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
