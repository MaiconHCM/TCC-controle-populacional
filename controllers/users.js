const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {

  create: function (req, res, next) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    //Caso criado seja um administrador:
    if (req.body.userRole === 0) {
      //Coloca de acordo a role selecionada
      user.role = req.body.role
    } else {
      //Se não, coloca como role usuário
      user.role = 3
    }

    userModel.create(user, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Usuário adicionado com sucesso!", data: null });

    });
  },

  // Criar usuário do tipo clínica
  createClinicUser: function (req, res, next) {

    // Define o usuário
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    // Coloca de acordo a role clinica
    user.role = 1
    // Define a clínica
    user.clinic = req.body.clinic

    //Usando o model de usuário, realiza o salvamento
    userModel.create(user, function (err, result) {
      if (err)
        next(err);
      else {
        res.json({
          status: "success",
          message: "Usuário da clínica adicionado com sucesso!",
          data: null
        });
      }
    });
  },

  authenticate: function (req, res, next) {

    // Utilizando regex para ignorar a diferença entre maiúsculas e minúsculas no nome de usuário.
    let name = { $regex: new RegExp("^" + req.body.name, "i") }

    // Buscando o usuário no banco.
    userModel.findOne({ name }, function (err, userInfo) {

      if (err) {
        // Caso retorne erro, ele procede para exibir o erro
        next(err);

      } else if (userInfo) {

        // É feito a comparação pelo bcrypt entre senha fornecida e senha criptografada no banco
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {

          //Caso usuario e senha coincidir, será criado um token incluindo outras informações.
          const token = jwt.sign(
            { id: userInfo._id, name: userInfo.name, email: userInfo.email, role: userInfo.role },
            req.app.get('secretKey'),
            { expiresIn: '1h' });

          //É feito o retorno em JSON com o token criado, o nome de usuário e sua role.
          res.json({
            status: "success",
            message: "Usuário encontrado!",
            data: { token, name: userInfo.name, role: userInfo.role }
          });

        } else {
          // Caso a senha não coincidir, informa erro ao usuário por meio de um retorno JSON
          res.json({ status: "error", message: "Nome de usuário ou senha incorreto.", data: null });
        }
      } else {
        // Caso não encontre o usuário, informa ao usuário por meio de um retorno JSON
        res.json({ status: "error", message: "Nome de usuário ou senha incorreto.", data: null });
      }
    });
  },

  //filter para busca
  filter: function (req, res, next) {
    if (req.body.userRole !== 0) {
      return res.status(403).json({ message: "Permissão insuficiente!", data: null });
    }
    let params = {};
    if (req.body['name']) {
      params['name'] = { $regex: req.body['name'], $options: 'i' };
    }
    if (req.body['role']) {
      params['role'] = req.body['role'];
    }
    if (req.body['clinic']) {
      params['clinic'] = req.body['clinic'];
    }

    console.log(params);
    let data = [];
    userModel.find(params, function (err, listings) {
      if (err) {
        console.log(err)
        res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
      } else {
        for (let lists of listings) {

          delete lists.password;
          data.push(lists);
        }
        res.json({ status: "success", message: "Registros encontrados.", data });
      }
    });
  },

  getById: function (req, res, next) {
    if (req.body.userRole !== 0) {
      return res.status(403).json({ message: "Permissão insuficiente!", data: null });
    }
    console.log(req.body);
    userModel.findById(req.params.id, function (err, data) {
      if (err) {
        res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
      } else {
        delete data.password;
        res.json({ status: "success", message: "Registro encontrado.", data });
      }
    });
  },

  updateById: function (req, res, next) {
    if (req.body.userRole !== 0) {
      return res.status(403).json({ message: "Permissão insuficiente!", data: null });
    }
    //define autores da modificação
    const author = { updateBy: req.body.userId, updateAt: new Date().toISOString() };

    //adiciona cria variavel params e define autores e informações do body
    let params = Object.assign(req.body, author);

    //encontra modelo e atualiza
    console.log(params);
    userModel.findByIdAndUpdate(req.params.id, params, function (err, listingInfo) {
      if (err)
        res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
      else {
        res.json({ status: "success", message: "Registro atualizado com sucesso.", data: null });
      }
    });
  },

  deleteById: function (req, res, next) {
    //apaga pelo id
    userModel.findByIdAndRemove(req.params.id, function (err, listingInfo) {
      if (err)
        res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
      else {
        res.json({ status: "success", message: "Registro apagado com sucesso.", data: null });
      }
    });
  },
}