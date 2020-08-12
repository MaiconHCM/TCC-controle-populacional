const model = require('../models/persons');
const template = require('./template/crud');

let controller=template(model)
module.exports = controller