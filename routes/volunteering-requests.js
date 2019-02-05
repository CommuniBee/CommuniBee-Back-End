const Router = require('koa-router');
const VolunteeringRequest = require('../models/volunteering-request');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const Content = require('../models/content');

const router = new Router();

const getVolunteeringRequest = async (ctx) => {
  try {
    const requestedField = await VolunteeringRequest.find()
      .populate({
        path: 'content',
        model: Content,
      });
    DBMethods.handleDocResponse(ctx, requestedField);
  } catch (error) {
    DBMethods.handleErrors(ctx, error);
  }
};


router.get('/', getVolunteeringRequest)
  .get('/:id', DBMethods.getById(VolunteeringRequest))

  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringRequest))

  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
