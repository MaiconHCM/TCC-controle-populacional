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
  }
  return false;
 }
}
var roles = []
roles[0] = new userRole('Administrador')
roles[0].addPermission()

roles[1] = new userRole('Cliníca')
roles[1].addPermission('/api/procedures')
roles[1].addPermission('/api/procedimentos')

roles[2] = new userRole('SMMA Interno')
roles[2].addPermission('/app/animais',['GET'])
roles[2].addPermission('/app/procedimentos',['GET'])
roles[2].addPermission('/api/animals',['GET'])
roles[2].addPermission('/api/animals/filter',['POST'])
roles[2].addPermission('/api/procedures',['GET'])

//Administrador - Todas as funções.
//Clinica - Cadastro de Procedimentos
//SMMA Interno - Ver cadastro dos Animais e dashboard e ver procedimentos.
module.exports = roles;
