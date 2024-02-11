const { Response } = require("express");
const { hash, compare } = require("bcrypt");
const { getLogger } = require("log4js");

const { schemasValidation } = require("@utilities/http/SchemasValidator");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("@utilities/http/HttpErrors");
const UserModel = require("@user/models/UserModel");
const SignUpSchema = require("@user/schemas/SignUp");

const { createAccessToken } = require("../services/UserService");

async function getResponseUserData(user) {
  const logger = getLogger();

  logger.info("UserController.getResponseUserData starts");

  const userClaims = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    userName: user.userName,
  };

  const { accessToken, exp } = createAccessToken(userClaims);

  logger.info("UserController.getResponseUserData finished");

  return {
    expirationTime: exp,
    accessToken,
    ...userClaims,
  };
}

async function signUp(req, res) {
  const { body, logger } = req;
  logger.info("UserController.signUp starts");

  schemasValidation(SignUpSchema, body);

  const { userName, email, password, fullName } = body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ConflictError("User with this email already exist");
  }

  const hashedPassword = await hash(password, 14);

  const insertedUser = await UserModel.create({
    userName,
    email,
    password: hashedPassword,
    fullName,
  });

  const accessResponse = await getResponseUserData(insertedUser);

  logger.info("UserController.signUp finished");
  return res.json(accessResponse);
}

async function signIn(req, res) {
  const { body, logger } = req;
  logger.info("UserController.signIn starts");

  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if (!user) throw new NotFoundError("User not found");

  const isValid = compare(password, user.password);

  if (!isValid) throw new BadRequestError("Invalid credentials");

  const accessResponse = await getResponseUserData(user);

  logger.info("UserController.signIn finished");

  return res.json(accessResponse);
}

async function getUserProfile(req, res) {
  const {
    logger,
    user: { _id },
  } = req;
  logger.info("UserController.getUserProfile starts");

  const user = await UserModel.findById(_id);

  logger.info("UserController.getUserProfile finished");

  res.json(user);
}

module.exports = { signIn, signUp, getUserProfile };
