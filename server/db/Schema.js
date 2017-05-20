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
  status: String,
  likes: [Number],
  profileUrl: String,
  isChef: Boolean,
  location: [{ geo_lat: String, geo_lng: String }],
  rating: Number
});

var DishSchema = new Schema({
  cuisineType: String,
  name: String,
  description: String,
  dishImages: [String],
  chefId: [{ type: Schema.ObjectId, ref: "User" }],
  allergies: [String],
  cashDonation: Number,
  isActive: Boolean,
  quantity: Number
});

var OrderSchema = new Schema({
  chefId: [{ type: Schema.ObjectId, ref: "User" }],
  customerId: [{ type: Schema.ObjectId, ref: "User" }],
  cart: [Number],
  status: Number,
  date: { type: Date, default: Date.now },
  cashTotal: Number,
});

var CustomerReviewSchema = new Schema({
  reviewText: String,
  reviewerId: [{ type: Schema.ObjectId, ref: "User" }],
  revieweeId: [{ type: Schema.ObjectId, ref: "User" }],
  orderId: [{ type: Schema.ObjectId, ref: "Order" }]
});

var ChefReviewSchema = new Schema({
  reviewText: String,
  reviewerId: [{ type: Schema.ObjectId, ref: "User" }],
  revieweeId: [{ type: Schema.ObjectId, ref: "User" }],
  orderId: [{ type: Schema.ObjectId, ref: "Order" }]
});

DishSchema.plugin(autoIncrement.plugin, 'Dish');
OrderSchema.plugin(autoIncrement.plugin, 'Order');
CustomerReviewSchema.plugin(autoIncrement.plugin, 'CustomerReview');
ChefReviewSchema.plugin(autoIncrement.plugin, 'ChefReview');

var User = connection.model("User", UserSchema);
var Dish = connection.model("Dish", DishSchema);
var Order = connection.model("Order", OrderSchema);
var CustomerReview = connection.model("CustomerReview", CustomerReviewSchema);
var ChefReview = connection.model("ChefReview", ChefReviewSchema);

module.exports = {
  User: User,
  Dish: Dish,
  Order: Order,
  ChefReview: ChefReview,
  CustomerReview: CustomerReview,
};
