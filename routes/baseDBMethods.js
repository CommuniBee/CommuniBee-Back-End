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
            validateBeforeSave: false,
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

async function update(ctx, model) {
    try {
        var updatedDoc = await model.findOneAndUpdate({'_id': ctx.request.body._id }, { $set: ctx.request.body }, { new: true });
        ctx.ok(updatedDoc);
    } catch (error) {
        ctx.internalServerError();
    }
}

async function delete(ctx, model) {
    try {
        var removedDoc = await model.findOneAndDelete({'_id': ctx.request.body._id });
        ctx.ok(removedDoc);
    } catch (error) {
        ctx.internalServerError();
    }
}

module.exports = {
    list,
    create,
    update,
    remove,
}