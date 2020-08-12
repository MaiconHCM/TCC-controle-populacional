const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const schema = new mongoose.Schema({
 name: {
  type: String,
  trim: true,
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
});

// hash user password before saving into database
schema.pre('save', function (next) {
 this.password = bcrypt.hashSync(this.password, saltRounds);
 next();
});

module.exports = mongoose.model('User', schema);