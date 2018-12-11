const Router = require('koa-router');
const Content = require('../models/Content');

const router = new Router();

router.get('/', async (ctx) => {
    await Content.find({}, (err, doc) => {
      if (err) {
        ctx.internalServerError();
      }
      ctx.ok(doc);
    });
  });

module.exports = router.routes();
