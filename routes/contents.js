const Router = require('koa-router');
const Content = require('../models/Content');
const DBMethods = require('../common/baseDBMethods')

const router = new Router();

router.get('/', async (ctx) => {
        await DBMethods.list(ctx, Content);   
    })
    .post('/', async (ctx) => {
        await DBMethods.create(ctx, Content);
    });

module.exports = router.routes();
