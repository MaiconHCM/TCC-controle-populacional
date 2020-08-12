const model = require('../models/breeds');
const template = require('./template/crud');

let controller=template(model)
module.exports = controller