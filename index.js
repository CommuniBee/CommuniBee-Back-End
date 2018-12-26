require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');
const logger = require('./common/logger');

process
  .on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', (err) => {
    logger.error('Uncaught Exception thrown', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
server.listen(port, () => logger.info(`API server started on ${port}`));

// Database connection
mongoose.connection.on('error', error => logger.error('MongoDB connection error:', error));
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (coll, method, query, doc, options) => {
    logger.info(`Mongoose: db.${coll}.${method}(${JSON.stringify(query)}, ${JSON.stringify(options)});`);
  });
}
