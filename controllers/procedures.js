const model = require('../models/procedures');
const template = require('./template/api');

let controller=template(model)
module.exports = controller