const { Router } = require("express");

const TestsRoutes = require("./entities/test/TestsRoutes");
const ResumeRoutes = require("./entities/resume/ResumeRoutes");
const UsersRoutes = require("./entities/user/UsersRoutes");
const QuestionsRoutes = require("./entities/question/QuestionsRoutes");
const { validateAccess } = require("./middlewares/AuthMiddlewares");

const mainRouter = Router();

mainRouter.get("/", (_req, res) => res.send("OK"));

mainRouter.use("/user", UsersRoutes);
mainRouter.use("/test", validateAccess, TestsRoutes);
mainRouter.use("/resume", validateAccess, ResumeRoutes);
mainRouter.use("/question", validateAccess, QuestionsRoutes);

module.exports = mainRouter;
