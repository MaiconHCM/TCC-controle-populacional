const model = require('../models/origins');
const template = require('./template/api');

let controller=template(model)
module.exports = controller