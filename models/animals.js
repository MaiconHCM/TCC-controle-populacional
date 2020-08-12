const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //External:
 breed: { type: mongoose.Schema.Types.ObjectId, ref: 'Breeds' },
 specie: { type: mongoose.Schema.Types.ObjectId, ref: 'Species', required: true },
 owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Persons' },
 origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Origins', required: true },

 //Internal:
 name: String,
 age: { type: Number, validate: { validator: Number.isInteger, message: '{VALUE} is not an integer value' } },
 sex: { type: Number, min: 0, max: 2 },
 castrated: { type: Number, min: 0, max: 2 },
 coat: { type: Number, min: 0, max: 5 },
 size: { type: Number, min: 0, max: 5 },
 color: String,
 weight: Number,
 chipNumber: Number,
 comments: String,
 status: { type: Number, min: 0, max: 1 },


 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Animal", schema);