import { Router } from 'express';
import { authorizeUser, checkRequestUserId } from '../utils/middleware';
import { entryController } from '../controllers/entry';
import { resolver } from '../utils/resolver';

export const entriesRouter = Router();

entriesRouter.use(resolver(authorizeUser));

entriesRouter.use(resolver(checkRequestUserId));

entriesRouter
  .route('/:id')
  .get(resolver(entryController.getOne))
  .put(resolver(entryController.update))
  .delete(resolver(entryController.remove));

entriesRouter
  .route('/')
  .get(resolver(entryController.getAll))
  .post(resolver(entryController.create));
