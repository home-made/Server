const { User, CustomerReview, ChefReview } = require("../db/Schema");
var findOneOrCreate = require('mongoose-find-one-or-create');


exports.updateUser = (req, res) => {
  var updatedUser = req.body;
  User.findOneAndUpdate(
    { authId: updatedUser.authId },
    updatedUser,
    { new: true },
    (err, user) => {
      console.log(user);
      res.send(user);
    }
  );
};

exports.createUser = (req, res) => {
  // var user = req.body;
  console.log("INSIDE CREATE USER", req.params.id);
  // console.log(req.body);
  console.log(req.body.extraInfo.given_name);
  User.findOneOrCreate(
    { authId: req.params.id },
    {
      authId: req.params.id,
      firstName: req.body.extraInfo.given_name,
      lastName: req.body.extraInfo.family_name,
      profileUrl: req.body.extraInfo.picture_large,
      isChef: false
    },
    (err, user) => {
      res.send(user);
      console.log('ERR in create user: ', err);
      console.log('USER in create user: ', user);
    }
  );
};

exports.getUser = (req, res) => {
  var user = req.body;
  var userRes = [];
  User.find({ authId: req.params.id })
    .then(user => {
      Reviews.find({ authId: order.chefId }).then(reviews => {
        userRes.push(user);
        userRes.push(reviews);
        res.send(userRes);
      });
    })
    .catch(err => {
      console.log(err);
    });
};
