import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InternalServerError, UnauthorizedError } from './errors';
import { ApiError, IApiError } from './errors/api-error';

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
    throw new InternalServerError('secret token missing in server config');
  }

  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('missing authorization header');
  }

  if (!authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(
      'Invalid authorization header: authorization header must contain Bearer token'
    );
  }

  const split = authorization.split('Bearer ');

  if (split.length !== 2) {
    throw new UnauthorizedError(
      'Invalid authorization header: missing token after Bearer prefix'
    );
  }

  const token = split[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET) as DecodedObject;
    req.authorizedUserId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Provided token is expired');
    } else {
      throw new UnauthorizedError(error.message);
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

export const errorHandling = (
  err: IApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (err) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).send({ name: err.name, message: err.message });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};
