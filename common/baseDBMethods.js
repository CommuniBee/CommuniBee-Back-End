async function list(ctx, model) {
    try {
        var docs = await model.find({});
        ctx.ok(docs);
    } catch (error) {
        ctx.internalServerError();
    }
}

async function create(ctx, model) {
    var document = new model(ctx.request.body);

    try {
        await document.save({
            validateBeforeSave: true,
        });
        ctx.ok(document);
    } catch (err) {
        console.error(err);
        if(err.name == 'ValidationError') {
            ctx.badRequest('invalid document')    
        } else {
            ctx.internalServerError();
        }
    }
}

async function update() {

}

async function remove() {

}

module.exports = {
    list,
    create,
    update,
    remove,
}