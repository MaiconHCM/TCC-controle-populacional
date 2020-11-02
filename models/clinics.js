const mongoose = require("mongoose");

var schema = new mongoose.Schema({

 //Internal:
 name: { type: String, required: true },
 email: { type: String, required: true },
 telephone: { type: Number, required: true },
 cellPhone: Number,
 cep: String,
 neighborhood: String,
 address: String,
 number: Number,
 complement: String,
 city: String,
 state: String,
 cnpj: String,
 medicResponsible: { type: String, required: true },
 crmv: String,
 status: { type: Number, min: 0, max: 1 },

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Clinic", schema);