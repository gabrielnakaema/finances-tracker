import { Router } from 'express';
import { authorizeUser, checkRequestUserId } from '../utils/middleware';
import { entryController } from '../controllers/entry';

export const entriesRouter = Router();

entriesRouter.use(authorizeUser);

entriesRouter.use(checkRequestUserId);

entriesRouter.get('/', entryController.getAll);

entriesRouter.post('/', entryController.create);
