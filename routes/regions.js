const Router = require('koa-router');
const regions = require('../common/regions');

const router = new Router();

router.get('/', (ctx) => {
  ctx.ok(regions.all);
});

module.exports = router.routes();
