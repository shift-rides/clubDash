const express = require('express');
const bodyParser = require('body-parser');

const { login } = require('./helpers/login');

const app = express();

const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

login(app);

const port = process.env.SERVER_URL || 3000;
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
