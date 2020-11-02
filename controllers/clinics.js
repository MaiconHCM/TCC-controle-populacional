const model = require('../models/clinics');
const template = require('./template/api');

let controller=template(model)
module.exports = controller