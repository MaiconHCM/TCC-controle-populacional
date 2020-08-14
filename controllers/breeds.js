const model = require('../models/breeds');
const template = require('./template/api');

let controller=template(model)
module.exports = controller