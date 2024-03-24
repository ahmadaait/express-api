import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../core/error/response-error.js';
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../core/validation/user-validation.js';
import { validate } from '../core/validation/validation.js';
import { toUserResponse } from '../models/user-model.js';

const register = async (request) => {
  const registerRequest = validate(registerUserValidation, request);

  const totalUserWithSameEmail = await prismaClient.user.count({
    where: {
      email: registerRequest.email,
    },
  });

  if (totalUserWithSameEmail === 1) {
    throw new ResponseError(400, 'Email already exists');
  }

  registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

  const user = await prismaClient.user.create({
    data: registerRequest,
  });

  return toUserResponse(user);
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  let user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  user = await prismaClient.user.update({
    where: {
      email: loginRequest.email,
    },
    data: {
      token: uuid().toString(),
    },
  });

  const response = toUserResponse(user);
  response.token = user.token;

  return response;
};

const get = async (email) => {
  email = validate(getUserValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User is not found');
  }

  return toUserResponse(user);
};

const update = async (user, request) => {
  const updateRequest = validate(updateUserValidation, request);

  if (updateRequest.name) {
    user.name = updateRequest.name;
  }

  if (updateRequest.password) {
    user.password = await bcrypt.hash(updateRequest.password, 10);
  }

  const result = await prismaClient.user.update({
    where: {
      email: user.email,
    },
    data: user,
  });

  return toUserResponse(result);
};

const logout = async (email) => {
  email = validate(getUserValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'user is not found');
  }

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
