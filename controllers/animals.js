const model = require('../models/animals');
const template = require('./template/crud');

let controller=template(model)
module.exports = controller