const { Router } = require("express");

const TestsRoutes = require("@test/TestsRoutes");

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

mainRouter.use("/test", TestsRoutes);

module.exports = mainRouter;
