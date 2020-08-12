const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //External:
 specie: { type: mongoose.Schema.Types.ObjectId, ref: 'Species', required: true },

 //Internal:
 name: String,
 status: { type: Number, min: 0, max: 1 },

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Breed", schema);