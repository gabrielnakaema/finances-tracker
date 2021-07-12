import { Request, Response } from 'express';
import { User } from '../models/user';
import {
  checkPasswordEqualToHash,
  signToken,
  validateToken,
} from '../utils/auth';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../utils/errors';

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  if (!process.env.SECRET) {
    throw new InternalServerError('Secret Token not Found');
  }
  if (!req.body.username) {
    throw new BadRequestError('missing param: username');
  }
  if (!req.body.password) {
    throw new BadRequestError('missing param: password');
  }
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    throw new UnauthorizedError('wrong credentials');
  }
  const doesPasswordMatch = await checkPasswordEqualToHash(
    password,
    foundUser.password
  );

  if (doesPasswordMatch) {
    const token = signToken(foundUser._id);
    res.status(200).send({
      token,
      user: {
        name: foundUser.name,
        username: foundUser.username,
      },
    });
  } else {
    throw new UnauthorizedError('wrong credentials');
  }
};

export const validate = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  if (!req.body.token) {
    throw new BadRequestError('missing token from request header');
  }
  const userId: string | undefined = validateToken(req.body.token);
  if (userId) {
    const foundUser = await User.findOne({ _id: userId });
    if (foundUser) {
      return res.status(200).send({
        token: req.body.token,
        user: {
          name: foundUser.name,
          username: foundUser.username,
        },
      });
    } else {
      throw new UnauthorizedError('user with sent token not found');
    }
  } else {
    throw new UnauthorizedError('token is invalid');
  }
};
