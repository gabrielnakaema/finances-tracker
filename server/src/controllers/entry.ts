import { Response } from 'express';
import { Entry } from '../models/entry';
import { RequestWithUserId } from '../utils/middleware';

const getAll = async (req: RequestWithUserId, res: Response) => {
  if (!req.authorizedUserId) {
    return res.status(500).send({ message: 'internal server error' });
  }
  const authorizedUserId = req.authorizedUserId;
  const entries = await Entry.find({ createdBy: authorizedUserId });
  res.status(200).send(entries);
};

const getOne = () => {};

const create = async (req: RequestWithUserId, res: Response) => {
  const requiredFields = ['description', 'value', 'type', 'category'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `missing param: ${field}` });
    }
  }
  if (!req.authorizedUserId) {
    return res.status(500).send({ message: 'internal server error' });
  }
  const { description, value, type, category } = req.body;
  const authorizedUserId = req.authorizedUserId;

  const newEntry = await Entry.create({
    description,
    value,
    type,
    category,
    createdBy: authorizedUserId,
  });
  if (newEntry) {
    res.status(200).send(newEntry);
  }
};

const update = () => {};

const remove = () => {};

export const entryController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
