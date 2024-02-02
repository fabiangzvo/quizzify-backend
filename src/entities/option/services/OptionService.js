const { OptionModel } = require("../models/OptionModel");
const { getLogger } = require("log4js");

const logger = getLogger();

async function insertManyOptions(options) {
  logger.info("OptionService.InsertManyOptions starts");
  const response = await OptionModel.insertMany(options);

  logger.info("OptionService.InsertManyOptions finished");
  return response.map((option) => option._id);
}

module.exports = { insertManyOptions };
