import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface DecodedAuthObject {
  auth: boolean;
  token: string;
  user: {
    name: string;
    username: string;
  };
}

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

export const validateToken = (
  tokenToValidate: string
): DecodedAuthObject | undefined => {
  if (!tokenToValidate) {
    return;
  }
  const SECRET_KEY = process.env.SECRET as string;
  try {
    const decoded = jwt.verify(
      tokenToValidate,
      SECRET_KEY
    ) as DecodedAuthObject;
    if (decoded) {
      return decoded;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};
