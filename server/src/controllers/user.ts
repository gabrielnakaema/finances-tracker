import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword } from '../utils/auth';
import {
  BadRequestError,
  InternalServerError,
  UnprocessableEntityError,
} from '../utils/errors';

export const create = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['username', 'password', 'name'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new BadRequestError(`missing param: ${field}`);
    }
  }
  const { username, password, name } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(200).send({ message: 'Succesfully created user' });
    } else {
      res.status(500).send({ message: 'Error while creating new User' });
    }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new UnprocessableEntityError('username already exists');
    } else if (error.name === 'ValidationError') {
      if (error.errors) {
        let errorToSend = '';
        for (const field in error.errors) {
          errorToSend = errorToSend + error.errors[field].message + '\\n';
        }
        throw new UnprocessableEntityError(errorToSend);
      } else {
        throw new UnprocessableEntityError('validation error on user creation');
      }
    } else {
      throw new InternalServerError('user could not be created');
    }
  }
};
