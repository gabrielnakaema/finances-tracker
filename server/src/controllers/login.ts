import { Request, Response } from 'express';
import { User } from '../models/user';
import { checkPasswordEqualToHash, signToken } from '../utils/auth';

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  if (!process.env.SECRET) {
    return res.status(500).send({ message: 'internal server error' });
  }
  if (!req.body.username) {
    return res.status(401).send({ message: 'missing username' });
  }
  if (!req.body.password) {
    return res.status(401).send({ message: 'missing password' });
  }
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(401).send({ message: 'invalid username' });
  }
  const doesPasswordMatch = await checkPasswordEqualToHash(
    password,
    foundUser.password
  );

  if (doesPasswordMatch) {
    const token = signToken(foundUser._id);
    return res.status(200).send({ auth: true, token });
  } else {
    return res.status(401).send({ message: 'wrong credentials' });
  }
};
