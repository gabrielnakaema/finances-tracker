import { Router } from 'express';

export const entriesRouter = Router();

entriesRouter.get('/', (req, res) => {
  res.send('entries router');
});
