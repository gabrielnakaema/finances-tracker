import express from 'express';
import cors from 'cors';
import { entriesRouter } from './routes/entries';
import { login, validate } from './controllers/login';
import { create } from './controllers/user';
import { errorHandling } from './utils/middleware';
import { resolver } from './utils/resolver';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/entries', entriesRouter);

app.post('/login', resolver(login));

app.post('/register', resolver(create));

app.post('/validatetoken', resolver(validate));

app.use(errorHandling);

export default app;
