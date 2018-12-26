const winston = require('winston');

const errorStackTracerFormat = winston.format(info => (
  (info.meta && info.meta instanceof Error)
    ? Object.assign({}, info, {message: `${info.message} ${info.meta.stack}`})
    : info));

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(), // This is necessary to produce the 'meta' attribute
    errorStackTracerFormat(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;
