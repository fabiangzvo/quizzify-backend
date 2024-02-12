const { verify } = require("jsonwebtoken");

const {
  UnauthorizedError,
  BadRequestError,
} = require("../utilities/http/HttpErrors");

function validateAccess(req, _res, next) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) throw new UnauthorizedError();

  const [schema, token] = authorization.split(" ");

  if (schema.toLocaleLowerCase() !== "bearer")
    throw new BadRequestError("wrong auth schema");

  try {
    const claims = verify(token, process.env.JWT_SECRET);

    req.user = claims;

    return next();
  } catch (error) {
    throw new UnauthorizedError(error.message);
  }
}

module.exports = { validateAccess };
