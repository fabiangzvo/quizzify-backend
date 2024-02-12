const { Router } = require("express");

const { BaseRequestHandler } = require("../../utilities/http/HttpUtils");
const {
  postResume,
  getResumeById,
  getAllResumes,
} = require("./controllers/ResumeController");

const resumeRoutes = Router();

resumeRoutes.post("/", BaseRequestHandler(postResume));
resumeRoutes.get("/", BaseRequestHandler(getAllResumes));
resumeRoutes.get("/:resumeId", BaseRequestHandler(getResumeById));

module.exports = resumeRoutes;
