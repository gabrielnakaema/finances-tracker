import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword } from '../utils/auth';
import { validateFieldsExistence } from '../utils/validation';
import { BadRequestError } from '../utils/errors';

const REQUIRED_USER_FIELDS = ['username', 'password', 'name'];

export const create = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const missingFields = validateFieldsExistence(req.body, REQUIRED_USER_FIELDS);
  if (missingFields.length > 0) {
    throw new BadRequestError(`missing field(s): ${missingFields}`);
  }
  const { username, password, name } = req.body;
  const hashedPassword = await hashPassword(password);
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
};
