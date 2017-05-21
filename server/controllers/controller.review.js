const { User } = require("../db/Schema");

exports.getChefReviews = (req, res) => {
  var id = req.params.id
  User.find({ authId: id }, (err, user) => {
    res.send(user[0].chefReviews)
    });
};

exports.getUserReviews = (req, res) => {
  var id = req.params.id
  User.find({ authId: id }, (err, user) => {
    res.send(user[0].customerReviews)
    });
};

exports.postUserReview = (req, res) => {
  var id = req.params.id
  User.find({ authId: id }, (err, user) => {
    if(err) return res.send(err)
    user[0].customerReviews.push(req.body);
    res.send(user[0]);
  })
};

exports.postChefReview = (req, res) => {
  var id = req.params.id
  User.find({ authId: id }, (err, user) => {
    if(err) return res.send(err)
    user[0].chefReviews.push(req.body);
    res.send(user[0]);
  })
};
