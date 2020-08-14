const model = require('../models/species');
const template = require('./template/api');

let controller=template(model)
module.exports = controller