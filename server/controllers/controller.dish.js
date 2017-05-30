const { Dish } = require("../db/Schema");
var redis = require('redis');
// var client = require('redis-connection');
const AWS = require('aws-sdk')

// Amazon s3 config
const s3 = new AWS.S3(({ params: { Bucket: 'homemadedishes' } }));
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    subregion: 'us-east-1',
  });

exports.addDishImage = (req,res) => {
  s3.upload({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(data.Location);
      res.send('File uploaded to S3');
    }
  })
}


exports.updateDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndUpdate(query, req.body, { new: true })
    .then(dish => {
      client.get('dish',(err,data) =>{
        console.log(data)
        res.send(data)
      })
      // res.send(dish);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteDish = (req, res) => {
  var query = { _id: req.body._id };
  Dish.findOneAndRemove(query, req.body)
    .then(dish => {
      res.status(200).send("successfully deleted ", dish);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addDish = (req, res) => {
  var dish = new Dish(req.body);
  dish.save()
    .then(dish => {
      console.log("dish added", dish);
      // client.hmset('dish', dish, ()=> console.log('saved'));
      res.send(dish);
    })
    .catch(err => {
      console.log(err);
    });

};
