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
): Response | void => {
  if (!process.env.SECRET) {
    return res.status(500).send({ message: 'internal server error' });
  }

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

  try {
    const decoded = jwt.verify(token, process.env.SECRET) as DecodedObject;
    req.authorizedUserId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'token is expired' });
    } else {
      return res.status(401).send({ message: error.message });
    }
  }
};

export const checkRequestUserId = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.authorizedUserId) {
    return res.status(500).send({ message: 'internal server error' });
  }
  next();
};
