async function list(ctx, Model) {
  try {
    const docs = await Model.find({});
    ctx.ok(docs);
  } catch (error) {
    ctx.internalServerError();
  }
}

async function create(ctx, Model) {
  const document = new Model(ctx.request.body);

  try {
    await document.save({
      validateBeforeSave: false,
    });
    ctx.ok(document);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      ctx.badRequest('invalid document');
    } else {
      ctx.internalServerError();
    }
  }
}

async function update(ctx, Model) {
  try {
    const updatedDoc = await Model.findOneAndUpdate({ _id: ctx.request.body._id },
      { $set: ctx.request.body },
      { new: true });
    ctx.ok(updatedDoc);
  } catch (error) {
    ctx.internalServerError();
  }
}

async function remove(ctx, Model) {
  try {
    const removedDoc = await Model.findOneAndDelete({ _id: ctx.request.body._id });
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
};
