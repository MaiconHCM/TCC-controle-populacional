const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //Internal:
 name: { type: String, required: true },
 dateBirth: { type: Date },
 sex: { type: Number, min: 0, max: 2, default: 2 },
 email: { type: String, required: true },
 telephone: Number,
 cellPhone: { type: Number, required: true },
 cep: String,
 neighborhood: String,
 address: String,
 number: Number,
 complement: String,
 city: String,
 state: String,
 cpf: String,
 rg: String,
 status: { type: Number, min: 0, max: 1 },

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Person", schema);