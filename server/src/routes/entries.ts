import { Router } from 'express';
import { authorizeUser } from '../utils/middleware';
import { entryController } from '../controllers/entry';

export const entriesRouter = Router();

entriesRouter.use(authorizeUser);

entriesRouter.get('/', entryController.getAll);

entriesRouter.post('/', entryController.create);
