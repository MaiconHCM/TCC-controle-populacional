const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //Internal:
 name: String,
 dateBirth: { type: Date },
 sex: { type: Number, min: 0, max: 2 },
 email: String,
 phone: Number,
 cellPhone: Number,
 cep: String,
 address: String,
 number: Number,
 complement: String,
 city: String,
 state: String,
 cpf: String,
 rg: String,
 status: { type: Number, min: 0, max: 1 },

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Person", schema);