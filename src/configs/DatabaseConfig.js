const { createConnection } = require("mongoose");
const { getLogger } = require("log4js");

const connections = new Map();

function createConnectionStr(
  connectionName,
  connectionString,
  user,
  pass,
  dbName
) {
  const logger = getLogger();

  if (!connections.has(connectionString)) {
    const conn = createConnection(connectionString, {
      user,
      pass,
      dbName,
    });

    conn
      .on("error", (err) =>
        logger.info(
          "error",
          `[mongodb] Connection error with ${connectionName}: ${err.message}`
        )
      )
      .on("open", () =>
        logger.info("info", `[mongodb] Connected to ${connectionName}`)
      )
      .on("close", () =>
        logger.info("info", `[mongodb] Closed connection to ${connectionName}`)
      )
      .on("connecting", () =>
        logger.info("info", `[mongodb] Connecting to ${connectionName}`)
      )
      .on("disconnecting", () =>
        logger.info("info", `[mongodb] Disconnecting to ${connectionName}`)
      )
      .on("disconnected", () =>
        logger.info("info", `[mongodb] Disconnected to ${connectionName}`)
      )
      .on("reconnected", () =>
        logger.info("info", `[mongodb] Reconnected to ${connectionName}`)
      );

    connections.set(connectionString, conn);
  }

  return connections.get(connectionString);
}

const db = createConnectionStr(
  "QUIZ_APP_DB",
  process.env.DATABASE_URI,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  process.env.DATABASE_NAME
);

//db.set("debug", true);

module.exports = { db, createConnectionStr };
