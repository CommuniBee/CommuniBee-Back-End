const Router = require('koa-router');
const User = require('../models/user');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const logger = require('../common/logger');

const router = new Router();

router
  .get('/', DBMethods.list(User))
  .get('/:id', DBMethods.getById(User))

  .post('/', DBMethods.create(User))

  .use(auth.authenticate)
  .get('/subscriber/:id', ctx => {
    logger.info(ctx.state.user);
    logger.info(ctx.params.id);
    logger.info(ctx.params.id === ctx.state.user.sub);
    DBMethods.find(User, {sub_id: ctx.params.id})(ctx);
  })

  .put('/:id', DBMethods.update(User))

  .use(auth.validateFRCTeamPermissions)
  .delete('/:id', DBMethods.remove(User));

module.exports = router.routes();
