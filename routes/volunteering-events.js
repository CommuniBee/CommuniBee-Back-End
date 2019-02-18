const Router = require('koa-router');
const VolunteeringEvent = require('../models/volunteering-event');
const DBMethods = require('./base-db-methods');
const VolunteeringRequestOfferBaseModel = require('../models/volunteering-request-offer-base');
const VolunteeringOffer = require('../models/volunteering-offer');
const VolunteeringRequest = require('../models/volunteering-request');
const auth = require('../common/auth');
const Content = require('../models/content');
const SubRegion = require('../models/content');

const router = new Router();
const populateField = [
  {
    path: 'request',
    model: VolunteeringRequest,
    populate: [
      { path: 'content', model: Content, select: ['title'] },
      { path: 'regions', populate: { path: 'SubRegion', model: SubRegion } },
    ],
    select: ['title', 'contact', 'about', 'content', 'regions', 'organization'],
  },
  {
    path: 'offer',
    model: VolunteeringOffer,
    populate: [
      { path: 'content', model: Content, select: ['title'] },
      { path: 'regions', populate: { path: 'SubRegion', model: SubRegion } }],
    select: ['contact', 'content', 'regions', 'organization'],
  }];

function getRequestOrOffer(fieldName) {
  return async (ctx) => {
    try {
      const requestedField = await VolunteeringEvent.findById(ctx.params.id)
        .populate({
          path: fieldName,
          model: VolunteeringRequestOfferBaseModel,
        });
      DBMethods.handleDocResponse(ctx, requestedField);
    } catch (error) {
      DBMethods.handleErrors(ctx, error);
    }
  };
}

router.get('/', DBMethods.list(VolunteeringEvent, populateField))
  .get('/:id', DBMethods.getById(VolunteeringEvent))
  .get('/:id/request', getRequestOrOffer('request'))
  .get('/:id/offer', getRequestOrOffer('offer'))

  .use(auth.authenticate)
  .put('/:id', DBMethods.update(VolunteeringEvent))
  .use(auth.validateFRCTeamPermissions)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringEvent))
  .delete('/:id', DBMethods.remove(VolunteeringEvent));

module.exports = router.routes();
