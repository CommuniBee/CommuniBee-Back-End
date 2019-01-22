const categoriesRoutes = require('./categories');
const usersRoutes = require('./users');
const contentsRoutes = require('./contents');
const regionsRoutes = require('./regions');
const volunteeringEventsRoutes = require('./volunteering-events');
const volunteeringOffersRoutes = require('./volunteering-offers');
const volunteeringRequestsRoutes = require('./volunteering-requests');

module.exports = (router) => {
  router.use('/categories', categoriesRoutes);
  router.use('/users', usersRoutes);
  router.use('/contents', contentsRoutes);
  router.use('/regions', regionsRoutes);
  router.use('/volunteering-events', volunteeringEventsRoutes);
  router.use('/volunteering-offers', volunteeringOffersRoutes);
  router.use('/volunteering-requests', volunteeringRequestsRoutes);
};
