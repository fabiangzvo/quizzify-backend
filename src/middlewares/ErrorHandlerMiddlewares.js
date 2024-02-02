const { Response } = require("express");

const { HttpError } = require("@utilities/http/HttpErrors");
const { CustomRequest } = require("@utilities/http/HttpUtils");

const errMessageContainsError = (message) =>
  message.search("message") > -1 && message.search("statusCode") > -1;

const getErrorMessage = ({ statusCode, message, meta, error }) => {
  const errorMessage = error || {
    message,
    statusCode,
    meta,
  };

  if (errMessageContainsError(message)) {
    return JSON.parse(message.match(/{.+?}/g)) || errorMessage;
  }

  return errorMessage;
};

function ErrorHandler(err, req, res, next) {
  const { logger = console } = req;
  const { statusCode = 500, message = "Server error", meta, error } = err;

  const errorMessage = getErrorMessage({
    statusCode,
    message,
    meta,
    error,
  });

  logger.error(`ERROR: ${JSON.stringify(errorMessage)}`);

  res.status(statusCode).send(errorMessage);
}

module.exports = { ErrorHandler };
