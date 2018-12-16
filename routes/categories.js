const Router = require('koa-router');
const Category = require('../models/Category');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(Category))
  .get('/:id', DBMethods.getById(Category))
  .post('/', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.create(Category))
  .put('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.update(Category))
  .delete('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.remove(Category));

module.exports = router.routes();
