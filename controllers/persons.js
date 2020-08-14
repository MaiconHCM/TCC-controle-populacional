const model = require('../models/persons');
const template = require('./template/api');

let controller=template(model)
module.exports = controller