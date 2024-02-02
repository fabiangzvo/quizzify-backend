const { v4 } = require("uuid");
const { getLogger } = require("log4js");

function loggerMiddleware(req, _, next) {
  const transactionId = v4();
  const logger = getLogger(transactionId);

  req.logger = logger;
  req.transactionId = transactionId;

  logger.info(`${req.method} ${req.url}`);

  next();
}

module.exports = { loggerMiddleware };
