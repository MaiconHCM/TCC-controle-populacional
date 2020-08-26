const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users');
var jwt = require('jsonwebtoken');

router.post('/authenticate', userController.authenticate);
router.post('/register', validateUser, userController.create);
router.post('/filter', validateUser, userController.filter);
router.put('/:id', validateUser, userController.updateById);
router.get('/:id', validateUser, userController.getById);
router.delete('/:id', validateUser, userController.deleteById);

function validateUser(req, res, next) {
 jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
  if (err) {
   req.body.userRole = 9;
   next();
  } else {
   req.body.userRole = decoded.role;
   req.body.userId = decoded.id;
   next();
  }
 });
}

module.exports = router;