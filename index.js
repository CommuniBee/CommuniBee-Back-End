require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');
const logger = require('./common/logger');

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', (err) => {
    logger.error('Uncaught Exception thrown', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
server.listen(port, () => logger.info(`API server started on ${port}`));

const mongo_connection_options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

// Database connection
mongoose.connection.on('error', error => logger.error('MongoDB connection error:', error));
mongoose.connect(process.env.MONGODB_URI, mongo_connection_options);
mongoose.set('useFindAndModify', false);
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (coll, method, query, doc, options) => {
    logger.info(`Mongoose: db.${coll}.${method}(${JSON.stringify(query)}, ${JSON.stringify(options)});`);
  });
}
