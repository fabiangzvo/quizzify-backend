const { Router } = require("express");

const TestsRoutes = require("@test/TestsRoutes");
const ResumeRoutes = require("@resume/ResumeRoutes");
const UsersRoutes = require("@user/UsersRoutes");
const QuestionsRoutes = require("@question/QuestionsRoutes");

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);
mainRouter.use("/resume", ResumeRoutes);
mainRouter.use("/user", UsersRoutes);
mainRouter.use("/question", QuestionsRoutes);

module.exports = mainRouter;
