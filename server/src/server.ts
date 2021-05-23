import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'hello world!' });
});

export const start = () => {
  app.listen(3333, () => {
    console.log('app running on port 3333');
  });
};
