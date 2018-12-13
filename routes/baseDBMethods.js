const MAX_ALLOWED_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_PAGE_NUMBER = 1;

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

// Handles query paramters from GET / API
function processPaginationParameters(ctx) {

  // Proccessing pagination
  const pageNumber = parseInt(ctx.query.page, 10) || DEFAULT_PAGE_NUMBER;
  if (pageNumber < 1) {
    throw new RangeError('Query parameter \'page\' must be a positive number');
  }

  let pageSize = parseInt(ctx.query.page_size, 10) || DEFAULT_PAGE_SIZE;
  if (pageSize < 1) {
    throw new RangeError('Query parameter \'page_size\' must be a positive number');
  }
  pageSize = Math.min(MAX_ALLOWED_PAGE_SIZE, pageSize);

  // Proccessing dates range
  const moment = require('moment-timezone')
  const startDate = parseInt(ctx.query.startDate) || null;
  const endDate = parseInt(ctx.query.endDate) || null;

  let datesFilter = {};
  
  if ((startDate != null) && (endDate != null) && (startDate > endDate)) {
    throw new RangeError('Query parameter \'startDate\' can\'t be bigger than Query parameter \'endDate\'');
  } else if ((startDate != null) || (endDate != null)) {

    if (startDate < 1 && startDate != null) {
      throw new RangeError('Query parameter \'startDate\' must be a positive number');
    }

    if (endDate < 1 && endDate != null) {
      throw new RangeError('Query parameter \'endDate\' must be a positive number');
    }

    datesFilter.date = {};

    if (startDate != null) {
      datesFilter.date.$gte = moment(startDate).tz('Israel').format();
    }
    if (endDate != null) {
      datesFilter.date.$lte = moment(endDate).tz('Israel').format();
    }
  }

  return {
    datesFilter,
    options: { skip: pageSize * (pageNumber - 1),
    limit: pageSize, }  
  };
}

function list(Model) {
  return async function (ctx) {
    const allowedToFetchAll = false; // TODO check authentication

    let options = {};
    let queryFilter = {};

    try {
      if (!allowedToFetchAll) {
        const paginationParams = processPaginationParameters(ctx);
        options = paginationParams.options;
        queryFilter = paginationParams.datesFilter;
      }
      try {
        const docs = await Model.find(queryFilter, null, options);
        ctx.ok(docs);
      } catch (error) {
        handleErrors(ctx, error);
      }
    } catch (rangeError) {
      ctx.badRequest(rangeError.message);
    }
  };
}

function getById(Model) {
  return async function (ctx) {
    try {
      const doc = await Model.findById(ctx.params.id);
      handleDocResponse(ctx, doc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function create(Model) {
  return async function (ctx) {
    const requestedDoc = new Model(ctx.request.body);

    try {
      const savedDoc = await requestedDoc.save({
        validateBeforeSave: true,
      });
      ctx.ok(savedDoc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function update(Model) {
  return async function (ctx) {
    try {
      const updatedDoc = await Model.findByIdAndUpdate(ctx.params.id,
        { $set: ctx.request.body },
        { new: true });
      handleDocResponse(ctx, updatedDoc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function remove(Model) {
  return async function (ctx) {
    try {
      const removedDoc = await Model.findByIdAndRemove(ctx.params.id);
      handleDocResponse(ctx, removedDoc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  handleErrors,
  handleDocResponse,
};
