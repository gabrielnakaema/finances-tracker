import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword } from '../utils/auth';

const getOne = () => {};

export const create = async (req: Request, res: Response) => {
  if (!req.body.username) {
    return res.status(400).send({ message: 'missing username' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'missing password' });
  }
  if (!req.body.name) {
    return res.status(400).send({ message: 'missing person name' });
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

const update = () => {};

const remove = () => {};
