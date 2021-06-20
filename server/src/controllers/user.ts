import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword } from '../utils/auth';

export const create = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['username', 'password', 'name'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `missing param: ${field}` });
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
    if (error.name === 'MongoError' && error.code === 11000)
      res.status(422).send({ message: 'username is not unique' });
    else {
      res.status(500).send({ message: error.message });
    }
  }
};
