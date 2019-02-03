const Router = require('koa-router');
const Region = require('../models/region');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

router
  .get('/', DBMethods.list(Region))
  .get('/:id', DBMethods.getById(Region))

  .use(auth.validateFRCTeamPermissions)
  .post('/', DBMethods.create(Region))
  .put('/:id', DBMethods.update(Region))
  .delete('/:id', DBMethods.remove(Region));

module.exports = router.routes();
