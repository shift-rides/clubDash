const express = require('express');
const config = require('./config/config');

const app = express();
config(app);

const port = 8080;
app.listen(process.env.PORT || port)
