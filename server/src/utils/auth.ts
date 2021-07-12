import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from './errors';

export const hashPassword = async (textPassword: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
  return hashedPassword;
};

export const checkPasswordEqualToHash = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const doesPasswordMatch = await bcrypt.compare(password, hash);
  return doesPasswordMatch;
};

export const signToken = (userId: string): string | void => {
  if (process.env.SECRET) {
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1h' });
    return token;
  }
};

type DecodedValidationObject = {
  userId: string;
  iat: number;
  exp: number;
};

export const validateToken = (tokenToValidate: string): string | undefined => {
  if (!tokenToValidate) {
    throw new BadRequestError('missing token from request header');
  }
  const SECRET_KEY = process.env.SECRET as string;
  if (!SECRET_KEY) {
    throw new InternalServerError('secret key is missing in server config');
  }
  try {
    const decoded = jwt.verify(tokenToValidate, SECRET_KEY) as
      | DecodedValidationObject
      | undefined;
    if (decoded) {
      return decoded.userId;
    } else {
      throw new InternalServerError('decoded token is empty');
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('sent token is expired');
    } else {
      throw new UnauthorizedError('error during token validation');
    }
  }
};
