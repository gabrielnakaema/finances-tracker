/* eslint-disable indent */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InternalServerError, UnauthorizedError } from './errors';
import { ApiError, IApiError } from './errors/api-error';
import mongoose from 'mongoose';
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
  const decoded = jwt.verify(token, process.env.SECRET) as DecodedObject;
  req.authorizedUserId = decoded.userId;
  next();
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
  err: IApiError | Record<string, unknown>,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (err) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).send({ name: err.name, message: err.message });
    } else {
      handleOtherErrors(err as Record<string, unknown>, res);
    }
  }
};

const handleOtherErrors = (
  err: Record<string, unknown>,
  res: Response
): Response => {
  if (err.name) {
    switch (err.name) {
      case 'MongoError':
        if (err.code && err.code === 11000) {
          if (err.keyValue instanceof Object && Object.keys(err.keyValue)) {
            return res.status(422).send({
              message: `${Object.keys(err.keyValue)[0]} already exists`,
            });
          }
        } else {
          return res
            .status(422)
            .send({ message: 'database error while processing entity' });
        }
        return res
          .status(500)
          .send({ message: 'unexpected exception occurred' });
      case 'ValidationError':
        if (err.errors) {
          const error = err as unknown as mongoose.Error.ValidationError;
          let errorToSend = '';
          for (const field in error.errors) {
            errorToSend = errorToSend + error.errors[field].message + '\\n';
          }
          return res.status(422).send({ message: errorToSend });
        } else {
          return res.status(422).send({
            message: 'unknown validation error while processing entity',
          });
        }
      case 'TokenExpiredError':
        return res.status(401).send({ message: 'token is expired' });
      case 'JsonWebTokenError':
        return res.status(401).send({ message: 'invalid token' });
      default:
        return res
          .status(500)
          .send({ message: 'unexpected exception occurred' });
    }
  }
  return res.status(500).send({ message: 'unexpected exception occurred' });
};
