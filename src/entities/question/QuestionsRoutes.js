const { Router } = require("express");

const { BaseRequestHandler } = require("../../utilities/http/HttpUtils");
const { getQuestionById } = require("./controllers/QuestionController");

const testsRoutes = Router();

testsRoutes.get("/:questionId", BaseRequestHandler(getQuestionById));

module.exports = testsRoutes;
