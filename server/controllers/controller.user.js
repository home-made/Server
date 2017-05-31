const { User, CustomerReview, ChefReview } = require("../db/Schema");

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
  var user = req.body;
  User.create(user, (err, user) => {
    res.send(user);
  });
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
