const Router = require('koa-router');
const VolunteeringEvent = require('../models/VolunteeringEvent');
const DBMethods = require('./baseDBMethods');
const VolunteeringRequestOfferBaseModel = require('../models/VolunteeringRequestOfferBase');

const router = new Router();

function getRequestOrOffer(fieldName) {
  return async function (ctx) {
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

router.get('/', DBMethods.list(VolunteeringEvent))
  .get('/:id', DBMethods.getById(VolunteeringEvent))
  .get('/:id/request', getRequestOrOffer('request'))
  .get('/:id/offer', getRequestOrOffer('offer'))
  .post('/', DBMethods.create(VolunteeringEvent))
  .put('/:id', DBMethods.update(VolunteeringEvent))
  .delete('/:id', DBMethods.remove(VolunteeringEvent));

module.exports = router.routes();
