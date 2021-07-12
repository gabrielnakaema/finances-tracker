import { Response } from 'express';
import { Entry } from '../models/entry';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
} from '../utils/errors';
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
    throw new BadRequestError('missing param: id');
  }
  const foundEntry = await Entry.findOne({
    createdBy: authorizedUserId,
    _id: req.params.id,
  });
  if (foundEntry) {
    res.status(200).send(foundEntry);
  } else {
    throw new NotFoundError('entry with this id not found');
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
      throw new BadRequestError(`missing param: ${field}`);
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
  try {
    const receivedEntry = await Entry.create(newEntry);
    if (receivedEntry) {
      res.status(200).send(receivedEntry);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      if (error.errors) {
        let errorToSend = '';
        for (const field in error.errors) {
          errorToSend = errorToSend + error.errors[field].message + '\\n';
        }
        throw new UnprocessableEntityError(errorToSend);
      } else {
        throw new UnprocessableEntityError(
          'validation error on entry creation'
        );
      }
    } else {
      throw new InternalServerError('unexpected error while creating entry');
    }
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
        throw new BadRequestError(
          `missing param: ${field} in array index ${i}`
        );
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
    if (error.name === 'ValidationError') {
      if (error.errors) {
        let errorToSend = '';
        for (const field in error.errors) {
          errorToSend = errorToSend + error.errors[field].message + '\\n';
        }
        throw new UnprocessableEntityError(errorToSend);
      } else {
        throw new UnprocessableEntityError(
          'validation error on entry creation'
        );
      }
    } else {
      throw new InternalServerError('unexpected error while creating entry');
    }
  }
};

const update = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const requiredFields = ['description', 'value', 'type', 'category'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new BadRequestError(`missing param: ${field}`);
    }
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
    try {
      const updatedEntry = await foundEntry.save();
      res.status(200).send(updatedEntry);
    } catch (error) {
      if (error.name === 'ValidationError') {
        if (error.errors) {
          let errorToSend = '';
          for (const field in error.errors) {
            errorToSend = errorToSend + error.errors[field].message + '\\n';
          }
          throw new UnprocessableEntityError(errorToSend);
        } else {
          throw new UnprocessableEntityError(
            'validation error on entry creation'
          );
        }
      } else {
        throw new InternalServerError('unexpected error while updating entry');
      }
    }
  } else {
    throw new NotFoundError('Entry with supplied id not found');
  }
};

const remove = async (
  req: RequestWithUserId,
  res: Response
): Promise<Response | void> => {
  const authorizedUserId = req.authorizedUserId;
  const deletedEntry = await Entry.findOneAndDelete({
    _id: req.params.id,
    createdBy: authorizedUserId,
  });
  if (deletedEntry) {
    res.status(200).send({ message: 'successfully deleted entry' });
  } else {
    throw new NotFoundError(
      'entry with provided id was not found to be deleted'
    );
  }
};

export const entryController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
