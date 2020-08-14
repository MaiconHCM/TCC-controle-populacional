module.exports = function (model) {
  return {
    getById: function (req, res, next) {
      console.log(req.body);
      model.findById(req.params.id, function (err, data) {
        if (err) {
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {
          res.json({ status: "success", message: "Registro encontrado.", data });
        }
      });
    },

    getAll: function (req, res, next) {
      let data = [];
      model.find({}, function (err, listings) {
        if (err) {
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {
          for (let lists of listings) {
            data.push(lists);
          }
          res.json({ status: "success", message: "Registros encontrados.", data });
        }
      });
    },

    getAllArray: async function () {
      let data = [];
      await model.find({}, function (err, listings) {
        if (err) {
        } else {
          for (let lists of listings) {
            data.push(lists);
          }
        }
      });
      return data;
    },

    updateById: function (req, res, next) {
      //define autores da modificação
      const author = { updateBy: req.body.userId, updateAt: new Date().toISOString() };

      //adiciona cria variavel params e define autores e informações do body
      let params = Object.assign(req.body, author);

      //encontra modelo e atualiza
      model.findByIdAndUpdate(req.params.id, params, function (err, listingInfo) {
        if (err)
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        else {
          res.json({ status: "success", message: "Registro atualizado com sucesso.", data: null });
        }
      });
    },
    deleteById: function (req, res, next) {
      //apaga pelo id
      model.findByIdAndRemove(req.params.id, function (err, listingInfo) {
        if (err)
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        else {
          res.json({ status: "success", message: "Registro apagado com sucesso.", data: null });
        }
      });
    },

    create: function (req, res, next) {
      //define autores da modificação
      const author = { createBy: req.body.userId, updateBy: req.body.userId };

      //adiciona cria variavel params e define autores e informações do body
      let params = Object.assign(req.body, author);

      //Cria modelo
      model.create(params, function (err, result) {
        if (err)
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        else
          res.json({ status: "success", message: "Registro adicionado com sucesso.", data: null });
      });
    },

    //filter para busca
    filter: function (req, res, next) {
      let params = {};
      //gera os parametros.
      for (const x in req.body) {
        params[x] = { $regex: req.body[x], $options: 'i' };
      }
      //remove user id dos parametros.
      delete params['userId'];
      console.log(params);
      let data = [];
      model.find(params, function (err, listings) {
        if (err) {
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {
          for (let lists of listings) {
            data.push(lists);
          }
          res.json({ status: "success", message: "Registros encontrados.", data });
        }
      });
    },
  }
};