import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    console.log('missing token to validate');
    return;
  }
  const SECRET_KEY = process.env.SECRET as string;
  try {
    const decoded = jwt.verify(tokenToValidate, SECRET_KEY) as
      | DecodedValidationObject
      | undefined;
    if (decoded) {
      return decoded.userId;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};
