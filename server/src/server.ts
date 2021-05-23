import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { entriesRouter } from './routes/entries';
import { login } from './utils/auth';
import { create } from './controllers/user';

dotenv.config();
if (
  process.env.MONGO_INITDB_ROOT_USERNAME &&
  process.env.MONGO_INITDB_ROOT_PASSWORD
) {
  mongoose.connect('mongodb://localhost:27017/finances', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'db connection error'));
  db.once('open', () => {
    console.log('connected to mongoDB');
  });
}

const app = express();

app.use(express.json());

app.use('/entries', entriesRouter);

app.post('/login', login);

app.post('/register', create);

app.get('/', (req, res) => {
  res.send({ message: 'hello world!' });
});

export const start = () => {
  app.listen(3333, () => {
    console.log('app running on port 3333');
  });
};
