import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { entriesRouter } from './routes/entries';
import { login } from './utils/auth';

dotenv.config();

mongoose.connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/test`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', () => {
  console.log('connected to mongoDB');
});

const app = express();

app.use('/entries', entriesRouter);

app.post('/login', login);

app.get('/', (req, res) => {
  res.send({ message: 'hello world!' });
});

export const start = () => {
  app.listen(3333, () => {
    console.log('app running on port 3333');
  });
};
