const model = require('../models/animals');
const template = require('./template/api');

let controller = template(model)

//Filtra pelo proprietarios dos animais
controller.filterByOwner = function (req, res, next) {
 let params = {};
 if (req.body.owner) {
  params = {
   owner: { $all: req.body.owner }
  };
 } else {
  params = {
   owner: []
  };
 }

 data = []
 model.find(params, function (err, listings) {
  if (err) {
   res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
  } else {
   for (let lists of listings) {
    data.push(lists);
   }
   res.json({ status: "success", message: "Registros encontrados.", data });
  }
 });
}

module.exports = controller