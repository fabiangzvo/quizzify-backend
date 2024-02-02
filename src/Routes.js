const { Router } = require("express");

const mainRouter = Router();

mainRouter.get("/", (req, res) => res.send("OK"));

module.exports = mainRouter;
