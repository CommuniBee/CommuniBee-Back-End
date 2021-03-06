const Router = require('koa-router');
const User = require('../models/user');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

router
  .get('/', DBMethods.list(User))
  .get('/:id', DBMethods.getById(User))

  .post('/', DBMethods.create(User))

  .use(auth.authenticate)
  .get('/subscriber/me', async (ctx) => {
    await DBMethods.findOne(User, { sub_id: ctx.state.user.sub })(ctx);
  })

  .put('/:id', DBMethods.update(User))

  .use(auth.validateFRCTeamPermissions)
  .delete('/:id', DBMethods.remove(User));

module.exports = router.routes();
