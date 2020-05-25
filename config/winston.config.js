const winston = require('winston')
const path = require('path')

var options = {
  info: {
    level: "info",
    filename: path.join(__dirname, '../logs/app.log'),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  error: {
    level: "error",
    filename: path.join(__dirname, '../logs/error.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = {
  logger,
}