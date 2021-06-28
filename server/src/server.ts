import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { entriesRouter } from './routes/entries';
import { login, validate } from './controllers/login';
import { create } from './controllers/user';
import cors from 'cors';

dotenv.config();
if (
  process.env.MONGO_INITDB_ROOT_USERNAME &&
  process.env.MONGO_INITDB_ROOT_PASSWORD
) {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_HOST}/${process.env.MONGO_INITDB_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    }
  );

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'db connection error'));
  db.once('open', () => {
    console.log('connected to mongoDB');
  });
}

const app = express();

app.use(cors());

app.use(express.json());

app.use('/entries', entriesRouter);

app.post('/login', login);

app.post('/register', create);

app.post('/validatetoken', validate);

const port = process.env.PORT || 3333;

export const start = (): void => {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
};
