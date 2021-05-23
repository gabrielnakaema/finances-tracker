import { Request, Response } from 'express';
import { Entry } from '../models/entry';

const getAll = (req: Request, res: Response) => {
  res.send({ message: 'entries getAll controller' });
};

const getOne = () => {};

const create = () => {};

const update = () => {};

const remove = () => {};

export const entryController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
