const Router = require('koa-router');
const Content = require('../models/Content');

const router = new Router();

router.get('/', list)
    .post('/', create);

async function list(ctx) {
    await Content.find({}, (err, doc) => {
        if (err) {
            ctx.internalServerError();
        }
        ctx.ok(doc);
    })
}

async function create(ctx) {
    var content = new Content(ctx.request.body);

    try {
        await content.save({
            validateBeforeSave: true,
        });
        ctx.ok(content);
    } catch (err) {
        console.error(err);
        if(err.name == 'ValidationError') {
            ctx.badRequest('invalid document')    
        } else {
            ctx.internalServerError();
        }
    }
}

module.exports = router.routes();
