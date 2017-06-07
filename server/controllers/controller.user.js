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
      req.body.geo_lat = data.results[0].geometry.location.lat;
      req.body.geo_lng = data.results[0].geometry.location.lng;
    });
  }

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
};

exports.addSignature = (req, res) => {
  console.log("INSIDE ADD SIGNATURE");
  var updatedUser = req.body;

  User.findOneAndUpdate(
    { authId: req.params.authId },
    updatedUser,
    { new: true },
    (err, user) => {
      console.log("Are we in here??????????????????????????");
      if (err) {
        console.log(err);
      } else {
        console.log(user);
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
  //     res.send(user);
  //   });
  // }
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