require("module-alias/register");
const dotenv = require("dotenv");

dotenv.config();

const { urlencoded, json } = require("express");
const express = require("express");
const cors = require("cors");

const Routes = require("../src/Routes");
const { loggerMiddleware } = require("../src/middlewares/LoggerMiddlewares");
const { initLogger } = require("../src/utilities/logging/Logger");
const { ErrorHandler } = require("../src/middlewares/ErrorHandlerMiddlewares");
const { corsConfig } = require("../src/configs/CorsConfigs");

const { LOG_LVL = "info", PORT = 3000, NODE_ENV } = process.env;

const app = express();
initLogger(LOG_LVL);

app.use(cors(corsConfig));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(loggerMiddleware);

app.use("/api", Routes);

app.use(ErrorHandler);

module.exports = app;
