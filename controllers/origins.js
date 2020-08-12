const model = require('../models/origins');
const template = require('./template/crud');

let controller=template(model)
module.exports = controller