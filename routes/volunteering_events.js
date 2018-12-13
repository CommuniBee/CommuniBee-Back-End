const Router = require('koa-router');
const VolunteeringEvent = require('../models/VolunteeringEvent');
const DBMethods = require('./baseDBMethods');
const VolunteeringOfferRequestBaseModel = require('../models/VolunteeringOfferRequestBase');

const router = new Router();

function getOfferRequestOfEvent(fieldName) {
  return async function (ctx) {
    try {
      const requestedField = await VolunteeringEvent.findById(ctx.params.id)
        .populate({
          path: fieldName,
          model: VolunteeringOfferRequestBaseModel,
        });
      DBMethods.handleDocResponse(ctx, requestedField);
    } catch (error) {
      DBMethods.handleErrors(ctx, error);
    }
  };
}

router.get('/', DBMethods.list(VolunteeringEvent))
  .get('/:id', DBMethods.getById(VolunteeringEvent))
  .get('/:id/request', getOfferRequestOfEvent('request'))
  .get('/:id/offer', getOfferRequestOfEvent('offer'))
  .post('/', DBMethods.create(VolunteeringEvent))
  .put('/:id', DBMethods.update(VolunteeringEvent))
  .delete('/:id', DBMethods.remove(VolunteeringEvent));

module.exports = router.routes();
