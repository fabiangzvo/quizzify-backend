const { Router } = require("express");

const TestsRoutes = require("@test/TestsRoutes");
const ResumeRoutes = require("@resume/ResumeRoutes");

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);
mainRouter.use("/resume", ResumeRoutes);

module.exports = mainRouter;
