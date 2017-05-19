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
require('dotenv').load();

var mongoose = require('mongoose');
var mongoDB = process.env.DATABASE_URL;


var seedDatabase = () => {

  mongoose.connect(mongoDB);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  db.on('connected', function() {
    console.log('Successfully connected to DB!');
  });

  var dbCounter = 0;

  var closeDB = () => {
    db.close(function(){
      console.log("The connection to the database has been terminated.");
    });
  };



  //drop user collection
  User.remove({}, function(err, deletedUsers){
    if(err) {
      console.log('There was a problem deleting the users from the database. ', err);
    }

    dbCounter++;
    
    //seed user collection
    User.create(UserData, function(error, newDB) {
      if (err) {
        console.log('Seed data couldn\'t be saved to the Database. ', err);
      }
      console.log('The user data was successfully seeded to the Database. ', newDB);
      
      dbCounter === 18 ? closeDB() : dbCounter++; 

    });
  });



  //drop active dish collection
  ActiveDish.remove({}, function(err, deletedDishes){
    if(err) {
      console.log('There was a problem deleting the active dishes from the database. ', err);
    }
    dbCounter++;

    ActiveDish.create(ActiveData, function(error, newDB) {
      if (err) {
        console.log('Seed data couldn\'t be saved to the Database. ', err);
      }
      console.log('The data was successfully seeded to the Database. ', newDB);

      dbCounter === 18 ? closeDB() : dbCounter++; 

    });
  });



  //Update ActiveDishes with User IDs
  User.find({ firstName: 'Luke'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }

    dbCounter++;

    var id = user._id;

    ActiveDish.findOneAndUpdate({'name': 'Dumplings'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 
    });

  });
  

  User.find({ firstName: 'Leia'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }
    dbCounter++;

    var id = user._id;

    ActiveDish.findOneAndUpdate({'name': 'Samosas'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 
    });
  });


  User.find({ firstName: 'Han'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }

    dbCounter++;

    var id = user._id;

    ActiveDish.findOneAndUpdate({'name': 'Tacos'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 
    });
  });





  
  //drop inactive dish collection
  InactiveDish.remove({}, function(err, deletedInactiveDishs){
    if(err) {
      console.log('There was a problem deleting the inactive dishes from the database. ', err);
    }

    dbCounter++;

    InactiveDish.create(InactiveData, function(error, newDB) {
      if (err) {
        console.log('Seed data couldn\'t be saved to the Database. ', err);
      }
      console.log('The inactive dish data was successfully seeded to the Database. ', newDB);

      dbCounter === 18 ? closeDB() : dbCounter++; 

    });
  });



  //Update InactiveDishes
  User.find({ firstName: 'Luke'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }

    dbCounter++;

    var id = user._id;

    InactiveDish.findOneAndUpdate({'name': 'Dumplings'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 
    });

  });
  

  User.find({ firstName: 'Leia'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }

    dbCounter++;

    var id = user._id;

    InactiveDish.findOneAndUpdate({'name': 'Samosas'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 

    });
  });


  User.find({ firstName: 'Han'}, function (err, user) {
    if(err) {
      console.log('There was a problem finding the user in the db. ', err);
    }
    dbCounter++;

    var id = user._id;

    InactiveDish.findOneAndUpdate({'name': 'Tacos'}, { 'chefId': [id] }, function(err, updatedDish){
      if(err) {
        console.log('There was a problem finding the user in the db. ', err);
      }
      console.log('The updatedDish was ', updatedDish);

      dbCounter === 18 ? closeDB() : dbCounter++; 
    });
  });

};


seedDatabase();