const categoriesRoutes = require('./categories');
const contentsRoutes = require('./contents');
const regionsRoutes = require('./regions');
const usersRoutes = require('./users');
const volunteeringEventsRoutes = require('./volunteering_events');
const volunteeringOffersRoutes = require('./volunteering_offers');
const volunteeringRequestsRoutes = require('./volunteering_requests');

module.exports = (router) => {
  router.use('/categories', categoriesRoutes);
  router.use('/contents', contentsRoutes);
  router.use('/regions', regionsRoutes);
  router.use('/users', usersRoutes);
  router.use('/volunteering-events', volunteeringEventsRoutes);
  router.use('/volunteering-offers', volunteeringOffersRoutes);
  router.use('/volunteering-requests', volunteeringRequestsRoutes);
};
