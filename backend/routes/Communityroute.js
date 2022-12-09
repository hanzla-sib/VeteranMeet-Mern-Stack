let CommunitySchema = require('../Models/Community');
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();



router.route('/createCommunity').post((req, res, next) => {
  CommunitySchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      if (docs.length === 0) {
        var myData = new CommunitySchema(req.body);
        myData.save()
          .then(item => {
            res.send("item saved to Comunity database");
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      }
      else {
        res.send("user already exists");
      }
    }
  });
});



router.route('/checkuser').post((req, res, next) => {
  CommunitySchema.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      if (docs.length === 0) {
        res.send("0");
      }
      else {
        res.send(docs);
      }
    }
  });
});


router.route('/setmyevents').post((req, res, next) => {
  console.log(req.body.email);
  CommunitySchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      // console.log(req.body.email);
      var newPost = {
        Eventname: req.body.eventname,
        Eventtime: req.body.time,
      }
      CommunitySchema.findOneAndUpdate(
        { email: req.body.email },
        { $push: { myEvents: newPost } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
          res.send("successfully inserted in Myevents");
        });

    }
  });
});

router.route('/fetchmyevents').post((req, res, next) => {

  CommunitySchema.find({ email: req.body.email }, (error, data) => {

    res.send(data[0].myEvents);


  })
});

module.exports = router;