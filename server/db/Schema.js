const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

var UserSchema = new Schema({
    authId:String,
    firstName: String,
    lastName: String,
    bio: String,
    status: String,
    likes: { type: Array, default: void 0 },
    profileUrl: String,
    isChef: Boolean,
    location: [ { geo_lat: String, geo_lng: String } ],
    score: Number,
    dishes: [{type: Schema.ObjectId, ref: 'Dish'}]
})

var ActiveDishSchema = new Schema({
    cuisineType: String,
    name: String,
    description: String,
    dishImage: String,
    dishImages: { type: Array, default: void 0 },
    chefId:[{type:Schema.ObjectId, ref: 'User'}],
    allergies: { type: Array, default: void 0 },
    cashDonation: Number,
    quantity: Number,
})

var InactiveDishSchema = new Schema({
    cuisineType: String,
    name: String,
    description: String,
    dishImage: String,
    dishImages: { type: Array, default: void 0 },
    chefId:[{type:Schema.ObjectId, ref: 'User'}],
    allergies: { type: Array, default: void 0 },
    cashDonation: Number,
    quantity: Number,
})

var OrderSchema = new Schema({
    chefId: [{type:Schema.ObjectId, ref: 'User'}],
    cart: { type: Array, default: void 0 },
    cashTotal: Number,
    reviewId: [{type:Schema.ObjectId, ref: 'Review'}],
})

var ReviewSchema = new Schema({
    reviewText: String,
    userId: [{type:Schema.ObjectId, ref: 'User'}],
})

var User = mongoose.model('User', UserSchema);
var ActiveDish = mongoose.model('ActiveDish', ActiveDishSchema);
var Order = mongoose.model('Order', OrderSchema);
var InactiveDish = mongoose.model('InactiveDish', InactiveDishSchema);
var Review = mongoose.model('Review',ReviewSchema);

module.exports = {
    'User': User,
    'ActiveDish': ActiveDish,
    'Order': Order,
    'InactiveDish': InactiveDish,
    'Review': Review,
}