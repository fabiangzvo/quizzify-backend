const { Router } = require("express");

const { BaseRequestHandler } = require("../../utilities/http/HttpUtils");
const {
  postTest,
  getTestById,
  getAllTests,
} = require("./controllers/TestController");

const testsRoutes = Router();

testsRoutes.post("/", BaseRequestHandler(postTest));
testsRoutes.get("/", BaseRequestHandler(getAllTests));
testsRoutes.get("/:testId", BaseRequestHandler(getTestById));

module.exports = testsRoutes;
