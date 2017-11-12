const passport = require('passport');
const path = require('path');

const { User, Waiver, Club, Event} = require('../models/models');

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

  app.post('/clubs', (req, res) => {
    if (req.user.admin) {
      const newClub = new Club(Object.assign({}, { members: [] }, req.body));
      newClub.save(() => res.json({ success: true }));
    } else {
      res.json({ success: false });
    }
  });



  app.get('/clubs', (req, res) => {
    Club.find((err, clubs) => res.json(clubs));
  });
  app.get('/clubs/:clubId', (req, res) => {
    Club.findById(req.params.clubId, (err, club) => res.json(club));
  });
  app.post('/clubs/:clubId', (req, res) => {
    Club.findOneAndUpdate(req.params.clubId,
      { $push: { members: req.user._id } },
      { safe: true, upsert: true },
      () => res.json({ success: true }),
    );
  });

  app.post('/mainWaiver', (req, res) => {
    if (req.body.email !== req.user.email) {
      res.json({ success: false });
    } else {
      User.findById(req.user.id, (err, user) => {
        if (req.body.name !== req.user.name) {
          user.name = req.body.name;
        }
        const newWaiver = new Waiver(req.body);
        newWaiver.save(() => {
          user.waivers.push(newWaiver.id);
          user.save(() => res.json({ success: true }));
        });

        const newEvent = new Event({
          name: "hello",
          allDay: true,
          // start:'' ,
          // end: '',
          startLoc: "Brandeis",
          destination: "New York",
        //  driver: [],
          occupiedSeats:3,
          totalSeats: 4,
        });
        newEvent.save((saveErr) => {
          if (saveErr) {
            console.log("err",saveErr)
          } else {
        //    res.json({ success: true });
          }
        });
      });
    }
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/app.html'));
  });
};


module.exports = routeHelper;
