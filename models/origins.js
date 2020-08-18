const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //Internal:
 name: String,
 status: { type: Number, min: 0, max: 1 },

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Origin", schema);