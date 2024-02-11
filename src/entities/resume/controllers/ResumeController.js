const ResumeModel = require("@resume/models/ResumeModel");
const TestModel = require("@test/models/TestModel");
const { schemasValidation } = require("@utilities/http/SchemasValidator");

const createResumeSchema = require("../schemas/CreateResume");
const getAllResumesSchema = require("../schemas/getAllResumes");

async function postResume(req, res) {
  const { body, logger } = req;
  logger.info("ResumeController.postResume starts");

  schemasValidation(createResumeSchema, body);
  const { time, correctAnswers, rating, test, presentedAt, answers, user } =
    body;

  const insertedResume = await ResumeModel.insertMany([
    { time, correctAnswers, rating, test, presentedAt, answers, user },
  ]);

  const resume = await insertedResume.reduce(
    async (
      accum,
      { time, correctAnswers, rating, test: testId, presentedAt, answers, _id }
    ) => {
      const accumulator = await accum;

      const test = await TestModel.findById(testId);

      console.log(_id);
      return [
        ...accumulator,
        {
          time,
          correctAnswers,
          rating,
          presentedAt,
          answers,
          test,
          _id: _id,
        },
      ];
    },
    Promise.resolve([])
  );

  logger.info("ResumeController.postResume finished");
  return res.json(resume);
}

async function getResumeById(req, res) {
  const { query, logger } = req;
  logger.info("ResumeController.getResumeById starts");

  const { resumeId } = query;

  const test = await ResumeModel.findById(resumeId);

  logger.info("ResumeController.getResumeById finished");
  return res.json(test);
}

async function getAllResumes(req, res) {
  const { logger, query } = req;
  logger.info("ResumeController.getAllResumes starts");

  schemasValidation(getAllResumesSchema, query);

  const resumes = await ResumeModel.find({ user: query.userId }).populate(
    "test"
  );

  logger.info("ResumeController.getAllResumes finished");

  return res.json(resumes);
}

module.exports = { getAllResumes, getResumeById, postResume };
