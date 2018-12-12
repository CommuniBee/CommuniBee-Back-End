/* eslint-disable no-underscore-dangle */

function handleErrors(ctx, error) {
  console.error(error);
  if (error.name === 'ValidationError') {
    ctx.badRequest('Invalid document');
  } else if (error.name === 'CastError') {
    // CastError was thrown since the given ID is not a valid ObjectId
    ctx.badRequest(`Invalid id ${ctx.params.id}`);
  } else {
    ctx.internalServerError();
  }
}

function handleDocResponse(ctx, doc) {
  if (doc === null) {
    ctx.notFound(`Document with id ${ctx.params.id} not found`);
  } else {
    ctx.ok(doc);
  }
}

async function list(ctx, Model) {
  // TODO pagination
  try {
    const docs = await Model.find({});
    ctx.ok(docs);
  } catch (error) {
    handleErrors(ctx, error);
  }
}

async function getById(ctx, Model) {
  try {
    const doc = await Model.findById(ctx.params.id);
    handleDocResponse(ctx, doc);
  } catch (error) {
    handleErrors(ctx, error);
  }
}

async function create(ctx, Model) {
  const requestedDoc = new Model(ctx.request.body);

  try {
    const savedDoc = await requestedDoc.save({
      validateBeforeSave: true,
    });
    ctx.ok(savedDoc);
  } catch (error) {
    handleErrors(ctx, error);
  }
}

async function update(ctx, Model) {
  try {
    const updatedDoc = await Model.findByIdAndUpdate(ctx.params.id,
      { $set: ctx.request.body },
      { new: true });
    handleDocResponse(ctx, updatedDoc);
  } catch (error) {
    handleErrors(ctx, error);
  }
}

async function remove(ctx, Model) {
  try {
    const removedDoc = await Model.findByIdAndRemove(ctx.params.id);
    handleDocResponse(ctx, removedDoc);
  } catch (error) {
    handleErrors(ctx, error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};