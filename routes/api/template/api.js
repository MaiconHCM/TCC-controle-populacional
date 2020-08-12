module.exports = function (router,controller) {
 //rest
 router.get('/', controller.getAll);
 router.post('/', controller.create);
 router.get('/:id', controller.getById);
 router.put('/:id', controller.updateById);
 router.delete('/:id', controller.deleteById);

 //no-rest
 router.post('/filter', controller.filter);
}