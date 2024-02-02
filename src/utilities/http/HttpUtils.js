function BaseRequestHandler(handler) {
  return async (req, res, next) => {
    const { logger = console } = req;
    const section = "BaseRequestHandler";
    logger.info(section, "got request");

    try {
      await handler(req, res, next);
    } catch (err) {
      logger.error(section, "threw error", err);
      next(err);
    }
  };
}

module.exports = { BaseRequestHandler };
