const { User, CustomerReview, ChefReview } = require("../db/Schema");
exports.updateUser = (req, res) => {
  // res.send("update user");
  var updatedUser = req.body;
  User.findOneAndUpdate(
    { authId: updatedUser.authId },
    updatedUser,
    { new: true },
    (err, user) => {
      res.send(user);
    }
  );
};

exports.createUser = (req, res) => {
  var user = req.body;
  User.create(user, (err, user) => {
    res.send(user);
  });
  // res.send("create user");
};

exports.getUser = (req, res) => {
  var user = req.body;
  console.log("getUser");
  var results = [];
  User.find({ authId: req.params.id}, (err, user) => {
    results.push(user);
      Reviews.find({ authId: order.chefId }, (err, user) => {
        results.push(user);
      });
    });
  };
