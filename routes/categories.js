const Router = require('koa-router');
const Category = require('../models/category');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(Category))
  .get('/:id', DBMethods.getById(Category))

  .use(auth.authenticate)
  .use(auth.validateFRCTeamPermissions)
  .post('/', DBMethods.create(Category))
  .put('/:id', DBMethods.update(Category))
  .delete('/:id', DBMethods.remove(Category));

module.exports = router.routes();
