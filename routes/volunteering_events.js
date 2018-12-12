const Router = require('koa-router');
const VolunteeringEvent = require('../models/VolunteeringEvent');
const DBMethods = require('./baseDBMethods');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringEvent))
  .get('/:id', DBMethods.getById(VolunteeringEvent))
  .get('/:id/request', getSpecificField('request'))
  .get('/:id/offer', getSpecificField('offer'))
  .post('/', DBMethods.create(VolunteeringEvent))
  .put('/:id', DBMethods.update(VolunteeringEvent))
  .delete('/:id', DBMethods.remove(VolunteeringEvent));


function getSpecificField (fieldName) {
    return async function (ctx) {
        try {
            const requestedField = await VolunteeringEvent.findById(ctx.params.id).populate(fieldName);
            DBMethods.handleDocResponse(ctx, requestedField);
        } catch (error) {
            DBMethods.handleErrors(ctx, error);
        }
    }
}

module.exports = router.routes();
