const { configure } = require("log4js");

function initLogger(logLvl) {
  configure({
    appenders: {
      out: {
        type: "stdout",
      },
    },
    categories: { default: { appenders: ["out"], level: logLvl } },
  });
}

module.exports = { initLogger };
