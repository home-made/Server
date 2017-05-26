const { User, Dish } = require("../db/Schema");
var client = require('redis-connection');

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log(chefId);
  var results = [];
  User.find({ authId: chefId, isChef: true }, (err, user) => {
    if (err) return res.send(err);
    results.push(user);
    // console.log(user)
    Dish.find({ chefId: user[0].authId }, (err, dish) => {
      console.log(dish);
      results.push(dish);
      res.send(results);
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
  // var chefId =req.params.chefId;
  // res.send('req.body');
  User.find({authId:req.params.chefId})
    .then(user => {
      // client.hmset('chefs', user, ()=> console.log('saved'));
      res.send(user);
    })
    .catch(err => {
      res.send('err');
    });
};


exports.findChefsTest = (req, res) => {
  //for testing map
  console.log(req.body);
  User.find({})
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });    
};


exports.findChefsByStyle = (req, res) => {
  // var chefId =req.params.chefId;
  var chefs = [];
  console.log(req.params.styleId);
  Dish.find({
    isActive: true,
    cuisineType: req.params.styleId
  }).then(dishes => {
    dishes = dishes.map(curr => {
      return { authId: curr.chefId };
    });
    console.log(dishes)
    User.find({ $or: dishes })
      .then(users => {
        console.log(users)
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
