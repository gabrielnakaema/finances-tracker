import { Request, Response } from 'express';
import { User } from '../models/user';
import {
  checkPasswordEqualToHash,
  signToken,
  validateToken,
} from '../utils/auth';

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
    return res.status(200).send({
      auth: true,
      token,
      user: {
        name: foundUser.name,
        username: foundUser.username,
      },
    });
  } else {
    return res.status(401).send({ message: 'wrong credentials' });
  }
};

export const validate = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  if (!req.body.token) {
    return res.status(400).send({ message: 'token missing' });
  }

  const userId = validateToken(req.body.token);
  if (userId) {
    try {
      const foundUser = await User.findOne({ _id: userId });
      if (foundUser) {
        return res.status(200).send({
          auth: true,
          token: req.body.token,
          user: {
            name: foundUser.name,
            username: foundUser.username,
          },
        });
      } else {
        return res
          .status(404)
          .send({ message: 'user with sent token not found' });
      }
    } catch (error) {
      return res
        .status(404)
        .send({ message: 'user with sent token not found' });
    }
  } else {
    res.status(401).send({ message: 'unauthorized token' });
  }
};
