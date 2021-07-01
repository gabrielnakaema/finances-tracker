import { Response } from 'express';
import { Entry } from '../models/entry';
import { RequestWithUserId } from '../utils/middleware';

interface NewEntry {
  description: string;
  value: number;
  type: string;
  category: string;
  date?: string;
  createdBy: string;
}

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
  if (req.body instanceof Array) {
    return createMany(req, res);
  }
  const requiredFields = ['description', 'value', 'type', 'category'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `missing param: ${field}` });
    }
  }
  const { description, value, type, category } = req.body;
  const authorizedUserId = req.authorizedUserId as string;
  const newEntry: NewEntry = {
    description,
    value,
    type,
    category,
    createdBy: authorizedUserId,
  };
  if (req.body.date) {
    newEntry.date = req.body.date;
  }
  const receivedEntry = await Entry.create(newEntry);
  if (receivedEntry) {
    res.status(200).send(receivedEntry);
  }
};

const createMany = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['description', 'value', 'type', 'category'];
  const newEntries: NewEntry[] = [];
  const body = req.body as [];
  for (let i = 0; i < body.length; i++) {
    for (const field of requiredFields) {
      if (!body[i][field]) {
        return res
          .status(400)
          .send({ message: `missing param: ${field} in array index ${i}` });
      }
    }
    const { description, value, type, category } = req.body[i];
    const authorizedUserId = req.authorizedUserId as string;
    newEntries.push({
      description,
      value,
      type,
      category,
      date: req.body[i].date ? req.body[i].date : null,
      createdBy: authorizedUserId,
    });
  }
  try {
    const receivedEntries = await Entry.create(newEntries);
    res.status(200).send(receivedEntries);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['description', 'value', 'type', 'category'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({ message: `missing param: ${field}` });
    }
  }
  if (!req.params.id) {
    return res.status(400).send({ message: 'missing route param: id' });
  }
  const authorizedUserId = req.authorizedUserId;

  const foundEntry = await Entry.findOne({
    _id: req.params.id,
    createdBy: authorizedUserId,
  });

  if (foundEntry) {
    const { description, value, type, category } = req.body;
    foundEntry.description = description;
    foundEntry.value = value;
    foundEntry.type = type;
    foundEntry.category = category;
    const updatedEntry = await foundEntry.save();
    if (updatedEntry) {
      res.status(200).send(updatedEntry);
    } else {
      return res.status(500).send({ message: 'could not update entry' });
    }
  } else {
    return res.status(400).send({ message: 'invalid entry id' });
  }
};

const remove = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  if (!req.params.id) {
    return res.status(400).send({ message: 'missing route param: id' });
  }
  const authorizedUserId = req.authorizedUserId;

  const deletedEntry = await Entry.findOneAndDelete({
    _id: req.params.id,
    createdBy: authorizedUserId,
  });
  if (deletedEntry) {
    res.status(200).send({ message: 'successfully deleted entry' });
  } else {
    return res.status(500).send({ message: 'could not delete entry' });
  }
};

export const entryController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
