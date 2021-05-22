import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello wor');
});

app.listen(3333, () => {
  console.log('app running on port 3333');
});
