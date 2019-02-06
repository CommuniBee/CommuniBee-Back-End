const moment = require('moment-timezone');
const logger = require('../common/logger');
const auth = require('../common/auth');

const MAX_ALLOWED_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_PAGE_NUMBER = 1;

function handleErrors(ctx, error) {
  logger.warn('Handling error in DBMethods: ', error);
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

function processDatesRangeParameters(ctx) {
  const startDate = parseInt(ctx.query.startDate, 10);
  const endDate = parseInt(ctx.query.endDate, 10);

  const datesFilter = {};

  if ((!Number.isNaN(startDate))
    && (!Number.isNaN(endDate))
    && (startDate > endDate)) {
    throw new RangeError('Query parameter \'startDate\' must be earlier than query parameter \'endDate\'');
  } else if ((!Number.isNaN(startDate)) || (!Number.isNaN(endDate))) {
    datesFilter.date = {};

    if (!Number.isNaN(startDate)) {
      if (startDate < 1) {
        throw new RangeError('Query parameter \'startDate\' must be a positive number');
      }
      datesFilter.date.$gte = moment(startDate).tz('Asia/Jerusalem').format();
    }

    if (!Number.isNaN(endDate)) {
      if (endDate < 1) {
        throw new RangeError('Query parameter \'endDate\' must be a positive number');
      }
      datesFilter.date.$lte = moment(endDate).tz('Asia/Jerusalem').format();
    }
  }

  return datesFilter;
}

function processPaginationParameters(ctx) {
  const pageNumber = parseInt(ctx.query.page, 10) || DEFAULT_PAGE_NUMBER;
  if (pageNumber < 1) {
    throw new RangeError('Query parameter \'page\' must be a positive number');
  }

  let pageSize = parseInt(ctx.query.page_size, 10) || DEFAULT_PAGE_SIZE;
  if (pageSize < 1) {
    throw new RangeError('Query parameter \'page_size\' must be a positive number');
  }
  pageSize = Math.min(MAX_ALLOWED_PAGE_SIZE, pageSize);

  return {
    skip: pageSize * (pageNumber - 1),
    limit: pageSize,
  };
}

function list(Model, populates = []) {
  return async (ctx) => {
    const allowedToFetchAll = auth.hasFRCTeamPermissions(ctx);

    let options = {};
    let queryFilter = {};

    try {
      if (!allowedToFetchAll) {
        options = processPaginationParameters(ctx);
        queryFilter = processDatesRangeParameters(ctx);
      }
      try {
        let docs = Model.find(queryFilter, ctx.query.fields, options);
        populates.forEach((populate) => {
          docs = docs.populate(populate);
        });
        ctx.ok(await docs);
      } catch (error) {
        handleErrors(ctx, error);
      }
    } catch (rangeError) {
      ctx.badRequest(rangeError.message);
    }
  };
}

function getById(Model) {
  return async (ctx) => {
    try {
      const doc = await Model.findById(ctx.params.id);
      handleDocResponse(ctx, doc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function find(Model, query) {
  return async (ctx) => {
    try {
      const docs = await Model.find(query);
      handleDocResponse(ctx, docs);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function findOne(Model, query) {
  return async (ctx) => {
    try {
      const doc = await Model.findOne(query);
      handleDocResponse(ctx, doc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

function create(Model) {
  return async (ctx) => {
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
  return async (ctx) => {
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
  return async (ctx) => {
    try {
      const removedDoc = await Model.findByIdAndRemove(ctx.params.id);
      handleDocResponse(ctx, removedDoc);
    } catch (error) {
      handleErrors(ctx, error);
    }
  };
}

module.exports = {
  find,
  findOne,
  list,
  getById,
  create,
  update,
  remove,
  handleErrors,
  handleDocResponse,
};
