const passport = require('passport');
const path = require('path');

const routeHelper = (app) => {
  app.post('/login',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/login.html'));
  });

  app.get('/auth/google/callback',
    passport.authenticate('google',
      {
        failureRedirect: '/login',
      }),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.use((req, res, next) => {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/app.html'));
  });
};


module.exports = routeHelper;
