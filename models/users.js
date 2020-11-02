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
  required: true,
  unique: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 role: {
  type: Number,
  required: true
 },

 //Caso o usuário for uma clínica, esse campo será preenchido
 clinic: mongoose.Schema.Types.ObjectId,

 //Caso o usuário for uma pessoa física, esse campo será preenchido
 person: mongoose.Schema.Types.ObjectId,
});

// hash user password before saving into database
schema.pre('save', function (next) {
 this.password = bcrypt.hashSync(this.password, saltRounds);
 next();
});

module.exports = mongoose.model('User', schema);