const { sign } = require("jsonwebtoken");

function createAccessToken(data) {
  const exp =
    Math.floor(Date.now() / 1000) +
    Number.parseInt(process.env.JWT_EXP_TIME, 10);

  const accessToken = sign({ ...data, sub: data._id }, process.env.JWT_SECRET, {
    expiresIn: exp,
    issuer: process.env.JWT_ISSUER,
  });

  return { accessToken, exp };
}

module.exports = { createAccessToken };
