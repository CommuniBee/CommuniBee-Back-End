const Router = require('koa-router');
const Category = require('../models/Category');
const DBMethods = require('./baseDBMethods');

const router = new Router();

router.get('/', DBMethods.list(Category))
  .get('/:id', DBMethods.getById(Category))
  .post('/', DBMethods.create(Category))
  .put('/:id', DBMethods.update(Category))
  .delete('/:id', DBMethods.remove(Category));

module.exports = router.routes();
