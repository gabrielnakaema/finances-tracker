import { Handler, Request, Response, NextFunction } from 'express';

export const resolver = (handlerFunction: Handler) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handlerFunction(req, res, next)).catch(next);
  };
};
