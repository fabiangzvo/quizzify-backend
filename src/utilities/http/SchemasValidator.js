const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const { HttpError } = require("./HttpErrors");

let ajv = addFormats(new Ajv({ removeAdditional: true }));

ajv.addFormat("date-time", function (dateTimeString) {
  try {
    let date = null;

    if (typeof dateTimeString === "string") {
      date = new Date(dateTimeString);
    }

    return !!date;
  } catch (e) {
    return false;
  }
});

function formatError(errors) {
  const validationError = errors[0];
  const { message, dataPath } = validationError;

  return `${dataPath ? `${dataPath.replace(".", "")} ` : ""}${message.replace(
    ".",
    ""
  )}`;
}

function schemasValidation(schema, data) {
  const validator = ajv.compile(schema);

  const isValid = validator(data);

  if (isValid) return;

  const errorMessage = formatError(validator.errors);

  throw new HttpError(errorMessage, 400, {
    errors: validator.errors,
  });
}

module.exports = schemasValidation;
