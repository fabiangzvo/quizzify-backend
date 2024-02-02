require("module-alias/register");
const dotenv = require("dotenv");

dotenv.config();

const { urlencoded, json } = require("express");
const express = require("express");
const { getLogger } = require("log4js");
const cors = require("cors");

const Routes = require("./Routes");
const { loggerMiddleware } = require("@middlewares/LoggerMiddlewares");
const { initLogger } = require("@utilities/logging/Logger");
const { ErrorHandler } = require("@middlewares/ErrorHandlerMiddlewares");
const { corsConfig } = require("@configs/CorsConfigs");

const { LOG_LVL = "info", PORT = 3000 } = process.env;

const app = express();
initLogger(LOG_LVL);

app.use(cors(corsConfig));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(loggerMiddleware);

app.use("/api/", Routes);

app.use(ErrorHandler);

app.listen(PORT, () => {
  getLogger().info("server listening on", PORT);
});

module.exports = app;
