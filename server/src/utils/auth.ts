import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.username === 'test' && req.body.password === '12345') {
    const userId = 1;
    if (process.env.SECRET) {
      const token = jwt.sign({ userId }, process.env.SECRET);
      return res.json({ auth: true, token });
    } else {
      res.status(500).send({ message: 'internal server error' });
    }
  }
  res.status(401).json({ message: 'authentication failed' });
};

export const hashPassword = async (textPassword: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
  return hashedPassword;
};
