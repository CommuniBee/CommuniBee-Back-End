const Router = require('koa-router');
const VolunteeringRequest = require('../models/volunteering-request');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const Content = require('../models/content');
const SubRegion = require('../models/content');

const populates = [{ path: 'content', select: 'title' }];
const router = new Router();

const getVolunteeringRequest = async (ctx) => {
  try {
    const requestedField = await VolunteeringRequest.find({ isMatched: false })
      .populate([{ path: 'content', model: Content, select: ['title'] },
        { path: 'regions', populate: { path: 'SubRegion', model: SubRegion } }]);
    DBMethods.handleDocResponse(ctx, requestedField);
  } catch (error) {
    DBMethods.handleErrors(ctx, error);
  }
};

function setMatch(isMatch) {
  return async (ctx) => {
    try {
      const updatedDoc = await VolunteeringRequest.update({ _id: ctx.params.id },
        { isMatched: isMatch });
      DBMethods.handleDocResponse(ctx, updatedDoc);
    } catch (error) {
      DBMethods.handleErrors(ctx, error);
    }
  };
}

router.get('/', DBMethods.list(VolunteeringRequest, populates))
  .get('/unmatched', getVolunteeringRequest)
  .get('/:id', DBMethods.getById(VolunteeringRequest))
  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringRequest))
  .put('/matched/:id', setMatch(true))
  .put('/unmatched/:id', setMatch(false))
  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
