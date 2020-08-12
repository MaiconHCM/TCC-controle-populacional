const model = require('../models/species');
const template = require('./template/crud');

let controller=template(model)
module.exports = controller