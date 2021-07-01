import dotenv from 'dotenv';
dotenv.config();
import db from './db';
import app from './app';

const port = process.env.PORT || 3333;

export const start = (): void => {
  db.on('error', console.error.bind(console, 'db connection error'));
  db.once('open', () => {
    console.log('connected to mongoDB');
  });

  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
};
