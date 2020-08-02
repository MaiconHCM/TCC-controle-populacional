const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
var jwt = require('jsonwebtoken');

//não autenticado
router.get('/', function (req, res, next) {
  res.render('auth/layout', { title: 'Autenticar' });
});
router.get('/entrar',validateUser, function (req, res, next) {
  res.render('auth/signIn', { title: 'Entrar' });
});
router.get('/cadastrar',validateUser, function (req, res, next) {
  res.render('auth/signUp', { title: 'Cadastrar' });
});
router.get('/sair', function (req, res, next) {
  res.render('auth/signOut', { title: 'Sair' });
});
router.get('/404', function (req, res, next) {
  res.render('auth/404', { title: 'Erro 404' });
});

//verifca token
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      next();
    } else {
      res.status(403).json({ message: 'Já está autenticado', data: null });
    }
  });
}
module.exports = router;