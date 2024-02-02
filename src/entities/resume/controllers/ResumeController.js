const ResumeModel = require("@resume/models/ResumeModel");
const { schemasValidation } = require("@utilities/http/SchemasValidator");

const createResumeSchema = require("../schemas/CreateResume");

async function postResume(req, res) {
  const { body, logger } = req;
  logger.info("ResumeController.postResume starts");

  schemasValidation(createResumeSchema, body);
  const { time, correctAnswers, rating, test, presentedAt } = body;

  const insertedTest = await ResumeModel.insertMany([
    { time, correctAnswers, rating, test, presentedAt },
  ]);

  logger.info("ResumeController.postResume finished");
  return res.json(insertedTest);
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
  const { logger } = req;
  logger.info("ResumeController.getAllResumes starts");

  const resumes = await ResumeModel.find({});

  logger.info("ResumeController.getAllResumes finished");

  return res.json(resumes);
}

module.exports = { getAllResumes, getResumeById, postResume };
