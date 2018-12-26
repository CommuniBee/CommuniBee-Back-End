const Router = require('koa-router');
const Content = require('../models/Content');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(Content))
  .get('/:id', DBMethods.getById(Content))

  .use(auth.authenticate)
  .post('/', DBMethods.create(Content))

  .use(auth.validateFRCTeamPermissions)
  .put('/:id', DBMethods.update(Content))
  .delete('/:id', DBMethods.remove(Content));

module.exports = router.routes();
