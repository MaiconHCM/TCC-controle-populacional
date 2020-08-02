const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
var jwt = require('jsonwebtoken');

//não autenticado
router.get('/', function (req, res, next) {
  res.render('dashboard/layout', { title: 'Início' });
});
router.get('/404', function (req, res, next) {
  res.render('dashboard/404', { title: 'Erro 404' });
});

//Autheticado
router.get('/inicio', validateUser, function (req, res, next) {
  res.render('dashboard/home', { title: 'Início', user: req.body.user });
});
router.get('/animais', validateUser, function (req, res, next) {
  res.render('dashboard/animals', { title: 'Animais', user: req.body.user });
});
router.get('/animais/form', validateUser, function (req, res, next) {
  res.render('dashboard/animalsForm', { title: 'Formulário Animais', user: req.body.user });
});
router.get('/meu-perfil', validateUser, function (req, res, next) {
  res.render('dashboard/profile', { title: 'Meu perfil', user: req.body.user });
});

//verifca token
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.status(401).json({ message: err.message, data: null });
    } else {
      req.body.user = decoded;
      console.log('\n\n' + JSON.stringify(decoded) + '\n\n')
      next();
    }
  });
}
module.exports = router;