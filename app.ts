import express from 'express';

const app = express();

app.get('/', (_, res) => {
  return res.json({ hello: 'world' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
