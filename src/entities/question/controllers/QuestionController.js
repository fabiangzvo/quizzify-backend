const QuestionModel = require("../models/QuestionModel");

async function getQuestionById(req, res) {
  const { params, logger } = req;
  logger.info("QuestionController.getQuestionById starts");

  const { questionId } = params;

  const question = await QuestionModel.findById(questionId).populate("options");

  logger.info("QuestionController.getQuestionById finished");
  return res.json(question);
}

module.exports = { getQuestionById };
