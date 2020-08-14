const model = require('../models/animals');
const template = require('./template/api');

let controller=template(model)
module.exports = controller