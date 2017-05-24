const { User } = require("../db/Schema");

exports.getChefReviews = (req, res) => {
  var id = req.params.id;
  User.find({ authId: id })
    .then(user => {
      res.send(user[0].chefReviews);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUserReviews = (req, res) => {
  var id = req.params.id;
  User.find({ authId: id })
    .then(user => {
      res.send(user[0].customerReviews);
    })
    .catch(err => {
      return res.send(err);
    });
};

exports.postUserReview = (req, res) => {
  var id = req.params.id;
  User.find({ authId: id })
    .then(user => {
      user[0].customerReviews.push(req.body);
      res.send(user[0]);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postChefReview = (req, res) => {
  var id = req.params.id;
  User.find({ authId: id })
    .then(user => {
      user[0].chefReviews.push(req.body);
      res.send(user[0]);
    })
    .catch(err => {
      console.log(err);
    });
};
