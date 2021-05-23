import { Request, Response } from 'express';
import { Entry } from '../models/entry';
import { RequestWithUserId } from '../utils/middleware';

const getAll = (req: Request, res: Response) => {
  res.send({ message: 'entries getAll controller' });
};

const getOne = () => {};

const create = async (req: RequestWithUserId, res: Response) => {
  /* 
    Necessary Fields :
      - description
      - value
      - type
      - category
      - createdBy
  */
  if (!req.body.description) {
    return res.status(400).send({ message: 'description missing' });
  }
  if (!req.body.value) {
    return res.status(400).send({ message: 'value missing' });
  }
  if (!req.body.type) {
    return res.status(400).send({ message: 'type missing' });
  }
  if (!req.body.category) {
    return res.status(400).send({ message: 'category missing' });
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
    console.log(newEntry);
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
