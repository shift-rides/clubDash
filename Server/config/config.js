const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const passportConfig = require('./passport');
const routeConfig = require('./routes');

const config = (app) => {
  app.use(serveStatic('build'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: false,
  }));
  const corsOptions = {
    origin: process.env.APP_DOMAIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
  };
  app.use(cors(corsOptions));

  passportConfig(app);
  routeConfig(app);
};

module.exports = config;
