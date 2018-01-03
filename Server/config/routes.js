const passport = require('passport');
const path = require('path');

const { User, Waiver, Club, Event} = require('../models/models')

const routeHelper = (app) => {
  app.post('/login',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }))

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/login.html'))
  })

  app.get('/auth/google/callback',
    passport.authenticate('google',
      {
        failureRedirect: '/login'
      }),
    (req, res) => {
      res.redirect('/')
    },
  )

  app.use((req, res, next) => {
    if (!req.user) {
      res.redirect('/login')
    } else {
      next()
    }
  })

  app.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/userInfo', (req, res) => {
    res.json(req.user)
  })



  app.get('/userInfoPapulate', (req, res) => {
    User.findOne({_id: req.user._id})
    .populate('eventRegistered') // <==
    .exec((err, events) => {
      if (err) {}
      res.json((events))
    })
  })

  app.get('/userInfo/:userId', (req, res) => {
    User.findById(req.params.userId, (err, profile) => res.json(profile))
  })

  app.get('/events', (req, res) => {
    Event.find()
    .populate('organizer')
    .populate('riders')
    .exec((err, events) => {
      if (err) {}
      res.json(events)
    })
  })

  app.get('/eventInfo/:eventId', (req, res) => {
    Event.findOne({_id: req.params.eventId})
    .populate('riders') // <==
    .exec((err, riders) => {
      if (err) {}
      res.json((riders))
    })
  })

  app.post('/clubs', (req, res) => {
    if (req.user.admin) {
      const newClub = new Club(Object.assign({}, { members: [] }, req.body))
      newClub.save(() => res.json({ success: true }))
    } else {
      res.json({ success: false })
    }
  })

  app.get('/clubs', (req, res) => {
    Club.find((err, clubs) => res.json(clubs))
  })
  app.get('/clubs/:clubId', (req, res) => {
    Club.findById(req.params.clubId, (err, club) => res.json(club))
  })

  app.post('/clubs/:clubId', (req, res) => {
    Club.findOneAndUpdate(req.params.clubId,
      { $push: { members: req.user._id } },
      { safe: true, upsert: true },
      () => res.json({ success: true }),
    )
  })



  app.post('/removeEvent/', (req, res) => {
    Event.remove({ _id: req.body.id }, function(err) {
        if (err) {
              console.log("error for removeEvent");
        }
        else {
            res.json({ success: true });
        }
    });
  })

  app.post('/removeUserFromEvent/', (req, res) => {
    Event.update(
      {_id: req.body.eventId},
      {$pull: {riders: req.body.riderId},
      $set:{"freeSeats": (req.body.freeSeats + 1)}})
      .then(err => {
        if (err) {}
        User.update({_id: req.body.riderId}, {$pull: {eventRegistered: req.body.eventId}})
        .then(err => {
          if (err) {}
          res.json({ success: true })
        })
      })
  })

// Saving an Event to DB
  app.post('/saveEvent', (req, res) => {
    const newEvent = new Event({
      allDay: false,
      start: req.body.timeslotStart,
      end: req.body.timeslotEnd,
      origin: req.body.origin,
      destination: req.body.destination,
      organizer: req.body.profile._id,
      riders: [],
      freeSeats: req.body.numSeats,
      desc: req.body.desc
    })
    newEvent.save((saveErr) => {
      if (saveErr) {
        console.log('err', saveErr)
      } else {
        res.json({success: true})
      }
    })
  })

  app.post('/joinEvent', (req, res) => {

    Event.findByIdAndUpdate(req.body.eventID, {
             $addToSet: {riders: req.body.userID},
             $set:{"freeSeats": (req.body.freeSeats-1)}
         }, function(err) {
             if(err) {
                 console.log(err);
                 return console.log('error 1');
             } else {
               console.log('free seats', req.body.freeSeats);
               User.findOneAndUpdate({_id: req.body.userID},
                 {$addToSet: {'eventRegistered': req.body.eventID}},
                 function(err) {
                 if (err) {
                   console.log('there is an error', err)
                 } else {
                   res.json({success: true})
                 }
               })
             }
         });
       });

  app.post('/mainWaiver', (req, res) => {
    if (req.body.email !== req.user.email) {
      res.json({ success: false })
    } else {
      User.findById(req.user.id, (err, user) => {
        if (err) {}
        user.phone = req.body.phone;
        if (req.body.name !== req.user.name) {
          user.name = req.body.name
        }
        const newWaiver = new Waiver(req.body)
        newWaiver.save(() => {
          user.waivers.push(newWaiver.id)
          user.save(() => res.json({ success: true }))
        })
      })
    }
  })

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'build/app.html'))
  })
}

module.exports = routeHelper
