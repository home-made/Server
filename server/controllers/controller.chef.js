const { User, Dish } = require("../db/Schema");

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log(chefId);
  var chef = [];
  User.find({ authId: chefId, isChef: true }).then(user => {
    console.log(user);
    Dish.find({ chefId: user[0].authId }).then(dishes => {
      console.log(dishes);
      chef.push(user[0]);
      chef.push(dishes);
      res.send(chef);
    });
  });
};

exports.updateChef = (req, res) => {
  User.findOneAndUpdate({ authId: req.body.authId }, req.body)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.findChefs = (req, res) => {
  console.log(req.body);
  User.find({ "location.geo_lat": "somewhere" })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.findChefsByStyle = (req, res) => {
  console.log(req.body);
  Dish.find({
    isActive: true,
    cuisineType: req.params.styleId
  }).then(dishes => {
    dishes = dishes.map(curr => {
      return { authId: curr.chefId };
    });
    User.find({ $or: dishes })
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.send(err);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
