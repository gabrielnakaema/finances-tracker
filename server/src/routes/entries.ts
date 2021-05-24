import { Router } from 'express';
import { authorizeUser, checkRequestUserId } from '../utils/middleware';
import { entryController } from '../controllers/entry';

export const entriesRouter = Router();

entriesRouter.use(authorizeUser);

entriesRouter.use(checkRequestUserId);

entriesRouter
  .route('/:id')
  .get(entryController.getOne)
  .put(entryController.update)
  .delete(entryController.remove);

entriesRouter
  .route('/')
  .get(entryController.getAll)
  .post(entryController.create);
