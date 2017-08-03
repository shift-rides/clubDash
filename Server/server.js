const express = require('express');
const config = require('./config/config');

const app = express();
config(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
