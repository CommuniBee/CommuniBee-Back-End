const Router = require('koa-router');
const Content = require('../models/Content');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(Content))
  .get('/:id', DBMethods.getById(Content))
  .post('/', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.create(Content))
  .put('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.update(Content))
  .delete('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.remove(Content));

module.exports = router.routes();
