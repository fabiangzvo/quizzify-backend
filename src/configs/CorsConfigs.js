const { ALLOWED_ORIGINS } = process.env;

const allowedOrigins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(",") : "*";

const methods = ["GET", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"];

const corsConfig = {
  origin: allowedOrigins,
  methods,
  allowedHeaders: ["Authorization", "Content-type"],
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = { corsConfig };
