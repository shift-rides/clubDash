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
  app.use(bodyParser());
  app.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET }));
  const corsOptions = {
    origin: process.env.APP_DOMAIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  passportConfig(app);
  routeConfig(app);
};

module.exports = config;
