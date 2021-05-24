import { Response } from 'express';
import { Entry } from '../models/entry';
import { RequestWithUserId } from '../utils/middleware';

const getAll = async (req: RequestWithUserId, res: Response): Promise<void> => {
  const authorizedUserId = req.authorizedUserId;
  const entries = await Entry.find({ createdBy: authorizedUserId });
  res.status(200).send(entries);
};

const getOne = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const authorizedUserId = req.authorizedUserId;
  if (!req.params.id) {
    return res.status(400).send({ message: 'missing param: id' });
  }
  const foundEntry = await Entry.findOne({
    createdBy: authorizedUserId,
    _id: req.params.id,
  });
  if (foundEntry) {
    res.status(200).send(foundEntry);
  } else {
    res.status(404).send({ message: 'entry not found' });
  }
};

const create = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['description', 'value', 'type', 'category'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `missing param: ${field}` });
    }
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
