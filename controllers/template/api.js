module.exports = function (model) {
  return {
    getById: function (req, res, next) {
      model.findById(req.params.id, function (err, data) {
        if (err) {
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {
          res.json({ status: "success", message: "Registro encontrado.", data });
        }
      });
    },

    getByIdArray: async function (id) {
      data = null
      await model.findById(id, function (err, rtn) {
        if (err) {
          data = null
        } else {
          data = rtn
        }
      });
      return data
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
    // Atualiza por id
    updateById: function (req, res, next) {
      // Cria objeto JSON e define autores da modificação
      const author = { updateBy: req.body.userId, updateAt: new Date().toISOString() };

      // Cria variavel params define informações do body e usuários autores da atualização.
      let params = Object.assign(req.body, author);

      // Tratamento de array.
      const auxParams = params;
      for (const key in auxParams) {
        if (key.indexOf('[]') !== -1) {
          let value = auxParams[key];
          if (auxParams[key] === '')
            value = []
          params[key.replace('[]', '')] = value;
          delete params[key];
        }
      }

      // Atualiza documento
      model.findByIdAndUpdate(req.params.id, params, function (err, listingInfo) {
        if (err) {
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {
          res.json({ status: "success", message: "Registro atualizado com sucesso.", data: null });
        }
      });
    },

    deleteById: function (req, res, next) {
      // Apaga pelo id
      model.findByIdAndRemove(req.params.id, function (err, listingInfo) {
        if (err) {
          //  retorna JSON com mensagem de erro
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else {

          //  Retorna JSON com mensagem de sucesso.
          res.json({ status: "success", message: "Registro apagado com sucesso.", data: null });
        }
      });
    },

    // Função de criação de registros
    create: function (req, res, next) {
      // Cria objeto JSON e define autores da modificação
      const author = {
        createBy: req.body.userId,
        updateBy: req.body.userId
      };

      // Cria variavel params define informações do body e usuários autores da criação.
      let params = Object.assign(req.body, author);

      // Tratamento de array.
      let auxParams = params;
      for (const key in auxParams) {
        if (key.indexOf('[]') !== -1) {
          params[key.replace('[]', '')] = auxParams[key];
          delete params[key];
        }
      }

      // Cria um novo modelo usando mongosse 
      model.create(params, function (err, result) {
        if (err) {
          // Exibe erro no console.
          console.log(err)
          // Retorna um objeto JSON com o erro.
          res.json({ status: "error", message: "Entre em contato com administradores do sistema.", data: null });
        } else
          // Retorna um objeto JSON com sucesso.
          res.json({ status: "success", message: "Registro adicionado com sucesso.", data: null });
      });
    },

    //filter para busca por parametros
    filter: function (req, res, next) {
      let params = {};
      //gera os parametros.
      for (const x in req.body) {

        if (typeof req.body[x] === 'object')
          params[x] = req.body[x];
        else
          params[x] = { $regex: req.body[x], $options: 'i' };

      }

      //remove user id dos parametros.
      delete params['userId'];

      let data = [];
      console.log(params);
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