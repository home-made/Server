require("dotenv").load();
const { User, CustomerReview, ChefReview } = require("../db/Schema");
var findOneOrCreate = require("mongoose-find-one-or-create");
var s3 = require("s3");
let geocoder = require("geocoder");

exports.updateUser = (req, res) => {
  console.log("Inside Update User request is", req.body);
  if (req.body.address) {
    geocoder.geocode(req.body.address, (err, data) => {
      console.log("GEO DATA IS", data);
      
      var geo_lat = data.results[0].geometry.location.lat;
      var geo_lng = data.results[0].geometry.location.lng;

      console.log("the geo_lat is ", geo_lat);
      console.log("the geo_lng is ", geo_lng);

      var updatedUser = req.body;

      updatedUser.location = {geo_lat, geo_lng};

      User.findOneAndUpdate(
        { authId: req.params.authId },
        updatedUser,
        { new: true },
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            console.log("The user with new geoloc is ", user);
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

exports.addSignature = (req, res) => {
  console.log("INSIDE ADD SIGNATURE");
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

  // if (req.body.pathname) {
  //   var client = s3.createClient({
  //     maxAsyncS3: 20,
  //     s3RetryCount: 3,
  //     s3RetryDelay: 1000,
  //     multipartUploadThreshold: 20971520,
  //     multipartUploadSize: 15728640,
  //     s3Options: {
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  //     }
  //   });
  //   var params = {
  //     localFile: req.body.pathname,
  //     s3Params: {
  //       Bucket: "homemadesignatures",
  //       Key: req.params.authId + ".png"
  //     }
  //   };

  //   var url = "s3.amazonaws.com/homemadesignatures/" + params.s3Params.Key;
  //   updatedUser.signatureURL = url;

  //   var uploader = client.uploadFile(params);
  //   uploader.on("error", function(err) {
  //     console.error("unable to upload:", err.stack);
  //   });
  //   uploader.on("progress", function() {
  //     console.log(
  //       "progress",
  //       uploader.progressMd5Amount,
  //       uploader.progressAmount,
  //       uploader.progressTotal
  //     );
  //   });
  //   uploader.on("end", function() {
  //     console.log("done uploading");
  //   });
  // }
};

//route we use to login to app that either finds or creates a user
exports.createUser = (req, res) => {
  // var user = req.body;

  let query = {};
  query.authId = req.params.id;
  if (req.body.extraInfo.given_name) { query.firstName = req.body.extraInfo.given_name };
  if (req.body.extraInfo.family_name) { query.lastName = req.body.extraInfo.family_name };
  if (req.body.extraInfo.picture_large) { query.profileUrl = req.body.extraInfo.picture_large}
  if (req.body.picture) { query.profileUrl = req.body.picture };
  if (req.body.email) {query.email = req.body.email}
  query.isChef = false;

  User.findOneOrCreate(
    { authId: req.params.id },
    query,
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
      // var chefReviewers = user[0].chefReviews.map(curr =>{
      //   return {authId: curr.reviewId }
      // })
      userRes.push(user)
      var customerReviewerUsers = user[0].customerReviews.map(curr =>{
        console.log(curr)
        return {authId: curr.reviewerId }
      })
      console.log(customerReviewerUsers)
      if(customerReviewerUsers.length>0){
        User.find({$or: customerReviewerUsers}).then(reviewers=>{
          console.log(reviewers);
          userRes.push(reviewers)
          customerReviewerUsers
          res.send(userRes);
        })
      }
      else{
        res.send(userRes);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
