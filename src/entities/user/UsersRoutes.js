const { Router } = require("express");

const { BaseRequestHandler } = require("@utilities/http/HttpUtils");
const { signUp, signIn } = require("./controllers/UserController");

const testsRoutes = Router();

testsRoutes.post("/sign-up", BaseRequestHandler(signUp));
testsRoutes.post("/sign-in", BaseRequestHandler(signIn));

module.exports = testsRoutes;
