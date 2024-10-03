import type { Request, Response } from 'express';
import Joi from 'joi';
import { userModel } from '../models/userModel';

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
    msg: 'Successfully registered new user',
    data: createdUser,
  });
}

export function profile(req: Request, res: Response) {
  const inputSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const { error, value } = inputSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  const foundUser = userModel.getUserById(value.id);

  if (!foundUser) {
    return res.status(404).json({ msg: 'User with that id not found' });
  }

  return res.json({ msg: 'Successfully found user', data: foundUser });
}
