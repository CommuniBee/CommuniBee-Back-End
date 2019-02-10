const Router = require('koa-router');
const VolunteeringOffer = require('../models/volunteering-offer');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const Content = require('../models/content');
const SubRegion = require('../models/content');

const router = new Router();

const getVolunteeringOffer = async (ctx) => {
  try {
    const requestedField = await VolunteeringOffer.find({ isMatched: false })
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
      const updatedDoc = await VolunteeringOffer.update({ _id: ctx.params.id },
        { isMatched: isMatch });
      DBMethods.handleDocResponse(ctx, updatedDoc);
    } catch (error) {
      DBMethods.handleErrors(ctx, error);
    }
  };
}

router.get('/', getVolunteeringOffer)
  .get('/:id', DBMethods.getById(VolunteeringOffer))

  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringOffer))
  .put('/matched/:id', setMatch(true))
  .put('/unmatched/:id', setMatch(false))
  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringOffer))

  .delete('/:id', DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
