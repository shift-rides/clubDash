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
    User.findOne({ _id: req.user._id})
    .populate('eventRegistered') // <==
    .exec(function(err, events){
      console.log(events);
         res.json((events));
    });
  })


  app.get('/userInfo/:userId', (req, res) => {
    User.findById(req.params.userId, (err, profile) => res.json(profile))
  })

  app.get('/events', (req, res) => {
    Event.find().lean().exec(function (err, users) {
     res.json((users))
    })
  })

  app.get('/eventInfo/:eventId', (req, res) => {
    Event.findOne({ _id: req.params.eventId})
    .populate('riders') // <==
    .exec(function(err, riders){
      console.log(riders);
         res.json((riders));
    });
  });




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


  app.post('/removeUserFromEvent/', (req, res) => {
Event.update(
  {_id: req.body.eventId},
  { $pull: {riders: req.body.riderId } }
).then( err => {
 User.update({
   _id: req.body.riderId
 },{ $pull: {eventRegistered: req.body.eventId }}
).then(err =>   res.json({ success: true })
 )
});
});



// Saving an Event to DB
  app.post('/saveEvent', (req, res) => {
    console.log('save event got hit backend', req.body)

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
    console.log('req body in join', req.body)
    Event.findOneAndUpdate({_id: req.body.eventID},
      {$push: {'riders': req.body.userID}},
      {safe: true, upsert: true, new : true},
    ).then((err) => {
      console.log('hi1')
      if (false) {
        console.log('there is err 1', err)
      } else {
        console.log('res', res)

        ///
        User.findOneAndUpdate({_id: req.body.userID},
          {$push: {'eventRegistered': req.body.eventID}},
          {safe: true, upsert: true, new : true},
        ).then((err) => {
          console.log('hi1')
          if (false) {
            console.log('there is an error', err)
          } else {
            res.json({success: true})
          }
        })
        ///
      }
    })
  })

  app.post('/mainWaiver', (req, res) => {
    if (req.body.email !== req.user.email) {
      res.json({ success: false })
    } else {
      User.findById(req.user.id, (err, user) => {
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
