const TestModel = require("@test/models/TestModel");
const { schemasValidation } = require("@utilities/http/SchemasValidator");
const { insertManyQuestions } = require("@question/services/QuestionService");

const createTestSchema = require("../schemas/CreateTest");

async function postTest(req, res) {
  const { body, logger } = req;
  logger.info("TestController.postTest starts");

  schemasValidation(createTestSchema, body);

  const { title, questions, description } = body;

  const insertedQuestions = await insertManyQuestions(questions);

  const insertedTest = await TestModel.insertMany([
    { title, description, questions: insertedQuestions },
  ]);

  logger.info("TestController.postTest finished");
  return res.json(insertedTest);
}

async function getTestById(req, res) {
  const { params, logger } = req;
  logger.info("TestController.getTest starts");

  const { testId } = params;

  const test = await TestModel.findById(testId);

  logger.info("TestController.getTest finished");
  return res.json(test);
}

async function getAllTests(req, res) {
  const { query, logger } = req;
  logger.info("TestController.getTest starts");

  const tests = await TestModel.find({});

  const response = tests.map(({ title, questions, description, _id }) => ({
    id: _id,
    title,
    total: questions.length,
    description,
  }));

  logger.info("TestController.getTest finished");

  return res.json(response);
}

module.exports = {
  postTest,
  getAllTests,
  getTestById,
};
