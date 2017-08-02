const User = require('../models').User;

const DOMAIN = 'colgate.edu';

const login = (app) => {
  app.post('/login', (req, res) => {
    const profile = req.body.profile;
    if (profile.email.split('@')[1] !== DOMAIN) {
      res.send({ success: false });
    } else {
      User.findOne({ googleId: profile.googleId })
        .then((user) => {
          if (user) {
            res.send({ success: true, user });
          } else {
            const newUser = new User({
              googleId: profile.googleId,
              name: profile.name,
              imageUrl: profile.imageUrl,
            });
            newUser.save()
              .then(() => {
                res.send({ success: true, user: newUser });
              });
          }
        });
    }
  });
}

module.exports = {
  login,
};
