const model = require('../models/proceduresPerformed');
const userModel = require('../models/users');
const template = require('./template/api');

let controller=template(model)

controller.create=async function (req, res, next){
 const userController=template(userModel)
 const proceduresPerformedcontroller=template(model)

 const user=await userController.getByIdArray(req.body.userId);
 
 req.body.clinic=user.clinic
 proceduresPerformedcontroller.create(req, res, next);
}

controller.create=async function (req, res, next){
 const userController=template(userModel)
 const proceduresPerformedcontroller=template(model)

 const user=await userController.getByIdArray(req.body.userId);
 
 req.body.clinic=user.clinic
 proceduresPerformedcontroller.create(req, res, next);
}

controller.filter=async function (req, res, next){
 const userController=template(userModel)
 const proceduresPerformedcontroller=template(model)

 const user=await userController.getByIdArray(req.body.userId);
 if(user.role!==0)
  req.body.clinic=user.clinic
 proceduresPerformedcontroller.filter(req, res, next);
}

module.exports = controller

