import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface RequestWithUserId extends Request {
  authorizedUserId?: string;
}

interface DecodedObject {
  userId: string;
}

export const authorizeUser = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .send({ message: 'User is not authorized, no authorization header' });
  }

  if (!authorization?.startsWith('Bearer')) {
    return res.status(401).send({
      message: 'User is not authorized, invalid authorization header',
    });
  }

  const split = authorization.split('Bearer ');

  if (split.length !== 2) {
    return res.status(401).send({ message: 'Invalid authorization header' });
  }

  const token = split[1];
  if (process.env.SECRET) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(500).send({ message: 'failed to authenticate' });
      }
      const decodedInfo = decoded as DecodedObject;
      req.authorizedUserId = decodedInfo.userId;
      next();
    });
  }
};
