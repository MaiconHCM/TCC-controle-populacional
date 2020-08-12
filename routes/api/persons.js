const express = require('express');
const router = express.Router();
const controller = require('../../controllers/persons');
const template = require('./template/api');

template(router, controller);

module.exports = router;