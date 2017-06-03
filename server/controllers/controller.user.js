const { User, CustomerReview, ChefReview } = require("../db/Schema");
const findOneOrCreate = require("mongoose-find-one-or-create");
var geocoder = require("geocoder");

exports.updateUser = (req, res) => {
  console.log("Inside Update User request is", req.body);
  if (req.body.address) {
    geocoder.geocode(req.body.address, (err, data) => {
      req.body.geo_lat =  data.results[0].geometry.location.lat;
      req.body.geo_lng = data.results[0].geometry.location.lng;
      var updatedUser = req.body;
      User.findOneAndUpdate(
        { authId: req.params.authId },
        updatedUser,
        { new: true },
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            console.log(user);
            res.send(user);
          }
        }
      );
    });
  } else {
    var updatedUser = req.body;
    User.findOneAndUpdate(
      { authId: req.params.authId },
      updatedUser,
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log(user);
          res.send(user);
        }
      }
    );
  }
};

//route we use to login to app that either finds or creates a user
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
      profileUrl: req.body.extraInfo.picture_large || req.body.picture,
      isChef: false
    },
    (err, user) => {
      res.send(user);
      console.log("ERR in create user: ", err);
      console.log("USER in create user: ", user);
    }
  );
};

exports.getUser = (req, res) => {
  //var user = req.body;

  var userRes = [];
  console.log("req.params.id is ", req.params.id);

  User.find({ authId: req.params.id })
    .then(user => {
      console.log("User inside getUser is ", user);

      res.send(user);
    })
    .catch(err => {
      console.log(err);
    });
};
