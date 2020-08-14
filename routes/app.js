const express = require('express');
const speciesController = require('../controllers/species');
const originsController = require('../controllers/origins');
const router = express.Router();
var jwt = require('jsonwebtoken');

//não autenticado
router.get('/', function (req, res, next) {
 res.render('dashboard/index', { title: 'Início' });
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
router.get('/animais', validateUser, function (req, res, next) {
 res.render('dashboard/animals/index', {}, function (err, html) {
  res.json({ title: 'Animais', html });
 });
});
router.get('/animais/form', validateUser, function (req, res, next) {
 res.render('dashboard/animals/form', {}, function (err, html) {
  res.json({ title: 'Formulário Animais', html });
 });
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
   res.json({ title: 'Raças', variables:{species}, html });
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
 try {
  res.render('dashboard/origins/index', {}, function (err, html) {
   res.json({ title: 'Origens', html });
  });
 } catch (e) { console.log(e) }
});
router.get('/origens/form', validateUser, async function (req, res, next) {
 try {
  let species = await speciesController.getAllArray();
  res.render('dashboard/origins/form', {}, function (err, html) {
   res.json({ title: 'Formulário Origens', html });
  });
 } catch (e) { console.log(e) }
});

//Pessoas
router.get('/pessoas', validateUser, async function (req, res, next) {
 try {
  res.render('dashboard/persons/index', {}, function (err, html) {
   res.json({ title: 'Pessoas', html });
  });
 } catch (e) { console.log(e) }
});
router.get('/pessoas/form', validateUser, async function (req, res, next) {
 try {
  res.render('dashboard/persons/form',{}, function (err, html) {
   res.json({ title: 'Formulário Pessoas', html });
  });
 } catch (e) { console.log(e) }
});

//Páginas padrões
router.get('/404', validateUser, function (req, res, next) {
 res.render('dashboard/404', {}, function (err, html) {
  res.json({ title: 'Erro 404', html });
 });
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