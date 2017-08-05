const passport = require('passport');
const path = require('path');

const routeHelper = (app) => {
  app.post('/login',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

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

  app.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/userInfo', (req, res) => {
    res.json(req.user);
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/app.html'));
  });
};


module.exports = routeHelper;
