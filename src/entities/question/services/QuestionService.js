const { getLogger } = require("log4js");

const { insertManyOptions } = require("../../option/services/OptionService");

const QuestionModel = require("../models/QuestionModel");

const logger = getLogger();

async function insertManyQuestions(questions) {
  logger.info("QuestionService.InsertManyQuestions starts");

  const response = await questions.reduce(async (accum, question) => {
    const accumulator = await accum;
    const { options, description } = question;

    const optionIds = await insertManyOptions(options);

    const [response] = await QuestionModel.insertMany([
      {
        description,
        options: optionIds,
      },
    ]);

    return Promise.resolve([...accumulator, response]);
  }, Promise.resolve([]));

  logger.info("QuestionService.InsertManyQuestions finished");
  return response.map((option) => option._id);
}

module.exports = { insertManyQuestions };
