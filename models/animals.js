const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //External:
 specie: { type: mongoose.Schema.Types.ObjectId, ref: 'species', required: true },
 breed: { type: mongoose.Schema.Types.ObjectId, ref: 'breeds', required: true },
 owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'persons' }],
 origin: { type: mongoose.Schema.Types.ObjectId, ref: 'origins', required: true },

 //Internal:
 name: String,
 age: Number,
 sex: { type: Number, min: 0, max: 2, default: 2 },
 castrated: { type: Number, min: 0, max: 2, default: 2 },
 coat: { type: Number, min: 0, max: 5, default: 0 },
 size: { type: Number, min: 0, max: 5, default: 0 },
 color: String,
 weight: Number,
 chipNumber: Number,
 comments: String,
 status: { type: Number, min: 0, max: 1 },


 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Animal", schema);