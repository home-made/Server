var UserData = require('./seeds/User.json');
var DishData = require('./seeds/Dish.json');
var OrderData = require('./seeds/Order.json');

var User = require('./server/db/Schema.js').User;
var Dish = require('./server/db/Schema.js').Dish;
var Order = require('./server/db/Schema.js').Order;
require('dotenv').load();

var mongoose = require('mongoose');
var mongoDB = process.env.DATABASE_URL;

var dbCounter = 0;




var seedData = () => {


  console.log("Starting to drop old Users");
  User.remove({}, function(err, deletedUsers){
    if(err) {
      console.log('There was a problem deleting the old users from the database. ', err);
    }

    dbCounter++;
    
    console.log("Start seeding new Users");
    User.create(UserData, function(error, newDB) {
      if (err) {
        console.log('User data couldn\'t be saved to the Database. ', err);
      }
      console.log('The user data was successfully seeded to the Database. ', newDB);
      
      if (dbCounter === 3)
        closeDB();

    });
  });



  console.log("Starting to drop old Dishes");
  Dish.remove({}, function(err, deletedDishes){
    if(err) {
      console.log('There was a problem deleting the old dishes from the database. ', err);
    }

    dbCounter++;

    Dish.create(DishData, function(error, newDB) {
      if (err) {
        console.log('Dish seed data couldn\'t be saved to the Database. ', err);
      }
      console.log('The dish data was successfully seeded to the Database. ', newDB);

      if (dbCounter === 3)
        closeDB();

    });
  });
  

  console.log("Starting to drop old Orders");
  Order.remove({}, function(err, deletedOrders){
    if(err) {
      console.log('There was a problem deleting the old orders from the database. ', err);
    }

    dbCounter++;

    Order.create(OrderData, function(error, newDB) {
      if (err) {
        console.log('Order seed data couldn\'t be saved to the Database. ', err);
      }
      console.log('The order data was successfully seeded to the Database. ', newDB);

      if (dbCounter === 3)
        closeDB();
    });
  });

}

var seedDatabase = () => {

  mongoose.connect(mongoDB);
  var db = mongoose.connection;


  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  db.on('connected', function() {
    console.log('Successfully connected to DB!');
  
  });

  var closeDB = () => {
    db.close(function(){
      console.log("The connection to the database has been terminated.");
    });
  }; 

}

seedDatabase();