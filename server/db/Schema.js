require("dotenv").load();
const Schema = require("mongoose").Schema, mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(process.env.DATABASE_URL);
autoIncrement.initialize(connection);

var UserSchema = new Schema({
  authId: String,
  firstName: String,
  lastName: String,
  bio: String,
  status: String,
  phoneNumber: String,
  likes: [Number],
  profileUrl: String,
  isChef: Boolean,
  location: { geo_lat: String, geo_lng: String, address: String },
  rating: Number
});

var DishSchema = new Schema({
  cuisineType: String,
  name: String,
  description: String,
  dishImages: [String],
  chefId: String,
  allergies: [String],
  cashDonation: Number,
  isActive: Boolean,
  quantity: Number
});

var OrderSchema = new Schema({
  chefId: String,
  customerId: String,
  cart: [Number],
  status: Number,
  date: { type: Date, default: Date.now },
  cashTotal: Number
});

var CustomerReviewSchema = new Schema({
  reviewText: String,
  reviewerId: String,
  revieweeId: String,
  score: Number,
  orderId: String
});

var ChefReviewSchema = new Schema({
  reviewText: String,
  reviewerId: String,
  revieweeId: String,
  score: Number,
  orderId: String
});

DishSchema.plugin(autoIncrement.plugin, "Dish");
OrderSchema.plugin(autoIncrement.plugin, "Order");
CustomerReviewSchema.plugin(autoIncrement.plugin, "CustomerReview");
ChefReviewSchema.plugin(autoIncrement.plugin, "ChefReview");

const User = connection.model("User", UserSchema);
const Dish = connection.model("Dish", DishSchema);
const Order = connection.model("Order", OrderSchema);
const CustomerReview = connection.model("CustomerReview", CustomerReviewSchema);
const ChefReview = connection.model("ChefReview", ChefReviewSchema);

module.exports = {
  User: User,
  Dish: Dish,
  Order: Order,
  ChefReview: ChefReview,
  CustomerReview: CustomerReview
};

/*
OrderSchema Status Codes
0: pending
1: accepted
2: completed
3: canceled
  
*/
