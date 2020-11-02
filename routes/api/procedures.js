const express = require('express');
const router = express.Router();
const controller = require('../../controllers/procedures');
const template = require('./template/api');

template(router, controller);

module.exports = router;