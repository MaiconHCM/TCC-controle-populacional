const mongoose = require("mongoose");

var schema = new mongoose.Schema({
 //External:
 owner: { type: mongoose.Schema.Types.ObjectId, ref: 'persons', required: true },
 animal: { type: mongoose.Schema.Types.ObjectId, ref: 'animals', required: true },
 procedure: { type: mongoose.Schema.Types.ObjectId, ref: 'procedures', required: true },
 clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'clinics', required: true },

 //Internal:
 startAt: { type: Date, required: true },
 endAt: { type: Date },
 medicResponsible: { type: String, required: true },
 crmv: String,
 status: { type: Number, min: 0, max: 1 },
 comments: String,

 //Control info:
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 createAt: { type: Date, default: Date.now },
 updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProcedurePerfomed", schema);