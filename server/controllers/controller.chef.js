const { User, Dish } = require("../db/Schema");
require("dotenv").load();

// var client = require('redis-connection');

exports.getChefDetails = (req, res) => {
  var chefId = req.params.chefId;
  console.log("Chef controller about to fetch details for id: ", chefId);

  var chef = [];
  User.find({ authId: chefId }).then(user => {
    console.log("SUCCESSFULLY FOUND USER");
    Dish.find({ chefId: user[0].authId, isActive: true }).then(dishes => {
      console.log("SUCCESSFULLY FOUND DISHES");
      chef.push(user[0]);
      chef.push(dishes);
      var reviewsUsers = user[0].chefReviews.map(curr => {
        console.log("curr is ", curr);
        return { authId: curr.reviewerId };
      });
      console.log("USER REVIEWS: ", reviewsUsers);
      if (reviewsUsers.length > 0) {
        User.find({ $or: reviewsUsers }).then(reviewers => {
          console.log(reviewers);
          chef.push(reviewers);
          res.send(chef);
        });
      } else {
        res.send(chef);
      }
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
  User.find({ authId: req.params.chefId })
    .then(user => {
      // client.hmset('chefs', user, ()=> console.log('saved'));
      res.send(user);
    })
    .catch(err => {
      res.send("err");
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
    console.log(dishes);
    var chefsFoundByCuisine = dishes.map(curr => {
      return { authId: curr.chefId };
    });
    console.log(chefsFoundByCuisine);
    //If Mongoose doesn't find any dishes, dishes is an empty array
    if (chefsFoundByCuisine.length !== 0) {
      User.find({ $or: chefsFoundByCuisine })
        .then(users => {
          console.log("USERS FOUND ARE", users);
          res.send(users);
        })
        .catch(err => {
          //Don't send an error, send an empty array
          res.send("THERE WAS AN ERROR");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      res.send([]);
    }
  });
};

exports.textChef = (req, res) => {
  var accountSid = process.env.TWILIOID;
  var authToken = process.env.TWILIOTOKEN;

  //require the Twilio module and create a REST client
  var client = require("twilio")(accountSid, authToken);
  console.log("PHONE NUMBER TO TEXT:", req.body);
  client.messages.create(
    {
      to: req.body.phone,
      from: "19163475110",
      body: "A customer will be arriving soon",
    },
    function(err, message) {
      console.log(message.sid);
    }
  );
  res.send("MESSAGE SENT");
};
