// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitterId: String,
  username: String,
  name: String,
  email:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
