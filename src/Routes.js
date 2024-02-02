const { Router } = require("express");

const TestsRoutes = require("@test/TestsRoutes");
const ResumeRoutes = require("@resume/ResumeRoutes");
const UsersRoutes = require("@user/UsersRoutes");

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);
mainRouter.use("/resume", ResumeRoutes);
mainRouter.use("/user", UsersRoutes);

module.exports = mainRouter;
