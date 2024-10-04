import type { Request, Response } from 'express';
import Joi from 'joi';
import { userModel, UserWithoutSensitiveInfo } from '../models/userModel';

export function register(req: Request, res: Response) {
  const inputSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });

  const { error, value } = inputSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  const createdUser = userModel.createUser(
    value.username,
    value.password,
    value.email
  );

  return res.json({
    msg: 'Your account was successfully registered.',
    data: createdUser,
  });
}

export function profile(_: Request, res: Response) {
  const foundUser = userModel.getUserById(
    (res.locals.decodedToken as UserWithoutSensitiveInfo).id
  );

  if (!foundUser) {
    return res
      .status(404)
      .json({ msg: 'No user account was found with that ID.' });
  }

  return res.json({ msg: 'Successfully found user', data: foundUser });
}

export function login(req: Request, res: Response) {
  const inputSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });

  const { error, value } = inputSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  const result = userModel.loginUser(value.username, value.password);

  if (!result.success) {
    return res.status(401).json({ msg: 'Invalid username or password.' });
  }

  return res.json({
    msg: 'You have successfully logged in.',
    data: {
      token: result.token,
    },
  });
}
