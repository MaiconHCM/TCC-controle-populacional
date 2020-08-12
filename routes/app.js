const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
var jwt = require('jsonwebtoken');

//não autenticado
router.get('/', function (req, res, next) {
 res.render('dashboard/index', { title: 'Início' });
});

//Home
router.get('/inicio', validateUser, function (req, res, next) {
 res.render('dashboard/home/index', { title: 'Início', user: req.body.user });
});

//Meu perfil
router.get('/meu-perfil', validateUser, function (req, res, next) {
 res.render('dashboard/profile/index', { title: 'Meu perfil', user: req.body.user });
});

//Animais
router.get('/animais', validateUser, function (req, res, next) {
 res.render('dashboard/animals/index', { title: 'Animais', user: req.body.user });
});
router.get('/animais/form', validateUser, function (req, res, next) {
 res.render('dashboard/animals/form', { title: 'Formulário Animais', user: req.body.user });
});
router.get('/animais/form', validateUser, function (req, res, next) {
 res.render('dashboard/animals/form', { title: 'Formulário Animais', user: req.body.user });
});

//Especies
router.get('/especies', validateUser, function (req, res, next) {
 res.render('dashboard/species/index', { title: 'Espécies', user: req.body.user });
});
router.get('/especies/form', validateUser, function (req, res, next) {
 res.render('dashboard/species/form', { title: 'Formulário Especies', user: req.body.user });
});

//Páginas padrões
router.get('/404', validateUser, function (req, res, next) {
 res.render('dashboard/404', { title: 'Erro 404' });
});


///Funções
//verifca token
function validateUser(req, res, next) {
 jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
  if (err) {
   res.status(401).json({ message: err.message, data: null });
  } else {
   req.body.user = decoded;
   next();
  }
 });
}
module.exports = router;