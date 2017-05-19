// var UserData = require('./seeds/User.json');
var ActiveData = require('./seeds/ActiveDish.json');
// var InactiveData = require('./seeds/Inactive.json');
// var OrderData = require('./seeds/Order.json');
// var ReviewData = require('./seeds/Review.json');

var User = require('./server/db/Schema.js').User;
var ActiveDish = require('./server/db/Schema.js').ActiveDish;
var Order = require('./server/db/Schema.js').Order;
var InactiveDish = require('./server/db/Schema.js').InactiveDish;
var Review = require('./server/db/Schema.js').Review;
require("dotenv").load();

var mongoose = require('mongoose');
var mongoDB = process.env.DATABASE_URL;


var seedDatabase = () => {


  mongoose.connect(mongoDB);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  db.on('connected', function() {
    console.log('Successfully connected to DB!');
  });

  //drop user collection
  User.remove({}, function(err, deletedUsers){
    if(err) {
      console.log('There was a problem deleting the users from the database. ', err);
    }
    
    //seed user collection
    User.create(UserData, function(error, newDB) {
      if (err) {
        console.log("Seed data couldn't be saved to the Database. ", err);
      }
      console.log("The user data was successfully seeded to the Database. ", newDB);
      db.close(function(){
        console.log("The connection to the database has been terminated.");
      });
    });

  });

  //drop active dish collection
  ActiveDish.remove({}, function(err, deletedDishes){
    if(err) {
      console.log('There was a problem deleting the active dishes from the database. ', err);
    }

    ActiveDish.create(ActiveData, function(error, newDB) {
      if (err) {
        console.log("Seed data couldn't be saved to the Database. ", err);
      }
      console.log("The cat data was successfully seeded to the Database. ", newDB);
      db.close(function(){
        console.log("The connection to the database has been terminated.");
      });
    });

  });
  
  //drop inactive dish collection
  InactiveDish.remove({}, function(err, deletedInactiveDishs){
    if(err) {
      console.log('There was a problem deleting the inactive dishes from the database. ', err);
    }

    InactiveDish.create(InactiveData, function(error, newDB) {
      if (err) {
        console.log("Seed data couldn't be saved to the Database. ", err);
      }
      console.log("The inactive dish data was successfully seeded to the Database. ", newDB);
      db.close(function(){
        console.log("The connection to the database has been terminated.");
      });
    });

  });
  

  Order.remove({}, function(err, deletedOrders){
    if(err) {
      console.log('There was a problem deleting the orders from the database. ', err);
    }

    Order.create(OrderData, function(error, newDB) {
      if (err) {
        console.log("Seed data couldn't be saved to the Database. ", err);
      }
      console.log("The order data was successfully seeded to the Database. ", newDB);
      db.close(function(){
        console.log("The connection to the database has been terminated.");
      });
    });
  });

  Review.remove({}, function(err, deletedReviews){
    if(err) {
      console.log('There was a problem deleting the orders from the database. ', err);
    }

    Review.create(ReviewData, function(error, newDB) {
      if (err) {
        console.log("Seed data couldn't be saved to the Database. ", err);
      }
      console.log("The review data was successfully seeded to the Database. ", newDB);
      db.close(function(){
        console.log("The connection to the database has been terminated.");
      });
    });
  });
};


seedDatabase();