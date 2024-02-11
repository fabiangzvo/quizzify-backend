const { Router } = require("express");

const { validateAccess } = require("@middlewares/AuthMiddlewares");
const { BaseRequestHandler } = require("@utilities/http/HttpUtils");
const {
  signUp,
  signIn,
  getUserProfile,
} = require("./controllers/UserController");

const testsRoutes = Router();

testsRoutes.get("/", validateAccess, BaseRequestHandler(getUserProfile));
testsRoutes.post("/sign-up", BaseRequestHandler(signUp));
testsRoutes.post("/sign-in", BaseRequestHandler(signIn));

module.exports = testsRoutes;
