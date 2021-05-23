import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.SECRET) {
    return res.status(400).send({ message: 'internal server error' });
  }
  if (!req.body.username) {
    return res.status(401).send({ message: 'missing username' });
  }
  if (!req.body.password) {
    return res.status(401).send({ message: 'missing password' });
  }
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  const doesPasswordMatch = await bcrypt.compare(password, foundUser.password);

  if (doesPasswordMatch) {
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET);
    return res.status(200).send({ auth: true, token });
  } else {
    return res.status(401).send({ message: 'wrong credentials' });
  }
};

export const hashPassword = async (textPassword: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
  return hashedPassword;
};
