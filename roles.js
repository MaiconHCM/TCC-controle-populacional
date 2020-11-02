class userRole {
  constructor(name) {
    this.canGet = []
    this.canPost = []
    this.canPut = []
    this.canDelete = []
    this.name = name
  }

  addPermission(url = '', methods = '') {
    if (url === '') {
      this.canGet = ['*']
      this.canPost = ['*']
      this.canPut = ['*']
      this.canDelete = ['*']
      return true;
    }
    if (methods === '') {
      this.canGet.push(url)
      this.canPost.push(url)
      this.canPut.push(url)
      this.canDelete.push(url)
      return true;
    }

    for (const prop in methods) {
      switch (methods[prop]) {
        case 'GET':
          this.canGet.push(url)
          break;
        case 'POST':
          this.canPost.push(url)
          break;
        case 'PUT':
          this.canPut.push(url)
          break;
        case 'DELETE':
          this.canDelete.push(url)
          break;
      }
    }
  }
  hasPermission(url, method) {
    let a = []
    switch (method) {
      case 'GET':
        a = this.canGet
        break;
      case 'POST':
        a = this.canPost
        break;
      case 'PUT':
        a = this.canPut
        break;
      case 'DELETE':
        a = this.canDelete
        break;
    }
    if (a[0] === '*') {
      return true;
    }

    for (const prop in a) {
      if (a[prop] === url)
        return true;

      if (a[prop].indexOf('?') !== -1) {
        let novaUrl = a[prop].replace('?', '');
        if (url.indexOf(novaUrl) !== -1) {
          return true;
        }

      }
    }

    return false;
  }
}
var roles = []
//Adm
roles[0] = new userRole('Administrador')
roles[0].addPermission()

//Clínica
roles[1] = new userRole('Cliníca')
roles[1].addPermission('/api/procedures-performed/?')
roles[1].addPermission('/api/procedures-performed/filter')
roles[1].addPermission('/api/animals/filter-by-owner')

roles[1].addPermission('/app/inicio', ['GET'])
roles[1].addPermission('/app/procedimentos-realizados', ['GET'])
roles[1].addPermission('/app/procedimentos-realizados/form?', ['GET'])
roles[1].addPermission('/app/', ['GET'])


//SMMA Interno
roles[2] = new userRole('SMMA Interno')
roles[2].addPermission('/app', ['GET'])
roles[2].addPermission('/app/animais', ['GET'])
roles[2].addPermission('/api/animals', ['GET'])
roles[2].addPermission('/api/animals/filter', ['POST'])

roles[2].addPermission('/app/procedimentos', ['GET'])
roles[2].addPermission('/api/procedures', ['GET'])

roles[2].addPermission('/api/procedures-performed', ['GET'])
roles[2].addPermission('/api/procedimentos-realizados', ['GET'])
roles[2].addPermission('/app/procedimentos-realizados', ['GET'])

//Administrador - Todas as funções.
//Clinica - Cadastro de Procedimentos
//SMMA Interno - Ver cadastro dos Animais e dashboard e ver procedimentos.
module.exports = roles;
