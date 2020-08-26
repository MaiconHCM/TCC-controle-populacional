const express = require('express');
const router = express.Router();
const speciesController = require('../controllers/species');
const originsController = require('../controllers/origins');
const breedsController = require('../controllers/breeds');
const personsController = require('../controllers/persons');
const roles = require('../roles');
var jwt = require('jsonwebtoken');

//não autenticado
router.get('/', function (req, res, next) {
 res.render('dashboard/base/index');
});

//Home
router.get('/inicio', validateUser, function (req, res, next) {
 res.render('dashboard/home/index', {}, function (err, html) {
  res.json({ title: 'Início', html });
 });
});

//Meu perfil
router.get('/meu-perfil', validateUser, function (req, res, next) {
 res.render('dashboard/profile/index', {}, function (err, html) {
  res.json({ title: 'Meu perfil', html });
 });
});

//Animais
router.get('/animais', validateUser, async function (req, res, next) {
 try {
  let species = await speciesController.getAllArray();
  let breeds = await breedsController.getAllArray();
  let origins = await originsController.getAllArray();
  res.render('dashboard/animals/index', {}, function (err, html) {
   res.json({ title: 'Animais', variables: { species, breeds, origins }, html });
  });
 } catch (e) { console.log(e) }

});

router.get('/animais/form', validateUser, async function (req, res, next) {
 try {
  let species = await speciesController.getAllArray();
  let breeds = await breedsController.getAllArray();
  let origins = await originsController.getAllArray();
  let persons = await personsController.getAllArray();
  res.render('dashboard/animals/form', { species, origins, persons }, function (err, html) {
   res.json({ title: 'Formulário Animais', variables: { breeds }, html });
  });
 } catch (e) { console.log(e) }
});

//Especies
router.get('/especies', validateUser, function (req, res, next) {
 res.render('dashboard/species/index', {}, function (err, html) {
  res.json({ title: 'Espécies', html });
 });
});
router.get('/especies/form', validateUser, function (req, res, next) {
 res.render('dashboard/species/form', {}, function (err, html) {
  res.json({ title: 'Formulário Espécies', html });
 });
});

//Raças
router.get('/racas', validateUser, async function (req, res, next) {
 try {
  let species = await speciesController.getAllArray();
  res.render('dashboard/breeds/index', {}, function (err, html) {
   res.json({ title: 'Raças', variables: { species }, html });
  });
 } catch (e) { console.log(e) }
});
router.get('/racas/form', validateUser, async function (req, res, next) {
 try {
  let species = await speciesController.getAllArray();
  res.render('dashboard/breeds/form', { species }, function (err, html) {
   res.json({ title: 'Raças', html });
  });
 } catch (e) { console.log(e) }
});

//Origens
router.get('/origens', validateUser, async function (req, res, next) {
 res.render('dashboard/origins/index', {}, function (err, html) {
  res.json({ title: 'Origens', html });
 });
});
router.get('/origens/form', validateUser, async function (req, res, next) {
 res.render('dashboard/origins/form', {}, function (err, html) {
  res.json({ title: 'Formulário Origens', html });
 });
});

//Pessoas
router.get('/pessoas', validateUser, function (req, res, next) {
 res.render('dashboard/persons/index', {}, function (err, html) {
  res.json({ title: 'Pessoas', html });
 });
});
router.get('/pessoas/form', validateUser, function (req, res, next) {
 res.render('dashboard/persons/form', {}, function (err, html) {
  res.json({ title: 'Formulário Pessoas', html });
 });
});

//Pessoas
router.get('/usuarios', validateUser, function (req, res, next) {
 res.render('dashboard/users/index', {}, function (err, html) {
  res.json({ title: 'Usuários', html });
 });
});
router.get('/usuarios/form', validateUser, function (req, res, next) {
 res.render('dashboard/users/form', {}, function (err, html) {
  res.json({ title: 'Formulário do usuário', html });
 });
});

//Páginas padrões
router.get('/404', validateUser, function (req, res, next) {
 res.render('dashboard/404', {}, function (err, html) {
  res.json({ title: 'Erro 404', html });
 });
});
router.get('/403', function (req, res, next) {
 res.render('dashboard/403', {}, function (err, html) {
  res.json({ title: 'Erro 403', html });
 });
});


///Funções
//verifica token
function validateUser(req, res, next) {
 jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
  if (err) {
   res.status(401).json({ message: err.message, data: null });
  } else {
   if (!roles[decoded.role].hasPermission(req.originalUrl, req.method)) {
    res.status(403).json({ message: "Permissão insuficiente para seu usuário", data: null });
   } else {
    next();
   }
  }
 });
}
module.exports = router;