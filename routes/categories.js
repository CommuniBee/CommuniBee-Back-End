const Router = require('koa-router');
const Category = require('../models/category');
const DBMethods = require('../controllers/base-db-methods');

const router = new Router();

router.get('/', DBMethods.list(Category))
  .get('/:id', DBMethods.getById(Category))
  .post('/', DBMethods.create(Category))
  .put('/:id', DBMethods.update(Category))
  .delete('/:id', DBMethods.remove(Category));

module.exports = router.routes();
