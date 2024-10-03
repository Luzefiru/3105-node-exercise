import express from 'express';

const app = express();

app.get('/', (_, res) => {
  return res.json({ hello: 'world' });
});

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
  console.log(`🚀 Server started on port: ${port}`);
});
