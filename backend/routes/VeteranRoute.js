
let VeteranSchema = require('../Models/Veterans');
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

router.route('/createVeteran').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      if (docs.length === 0) {
        var myData = new VeteranSchema(req.body);
        myData.save()
          .then(item => {
            res.send("item saved to database");
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
  VeteranSchema.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
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

router.route('/uploaduserpicture').post((req, res, next) => {
  console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {

      VeteranSchema.findOneAndUpdate(
        { email: req.body.email },
        { photo: req.body.image },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        });

      res.send("successfully inserted picture in database");
    }
  });
});



router.route('/followfollowers').post((req, res, next) => {


  VeteranSchema.findOneAndUpdate(
    { email: req.body.myemail },
    { $push: { followings: req.body.followedemail } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    });
  res.send("sucess with follower");
});

router.route('/uploadimageandtext').post((req, res, next) => {
  // console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {

    if (err) {
      res.send("not f");
    } else {
      // console.log(req.body.email);
      var newPost = {
        content: req.body.msg,
        media: req.body.myFile,
      }
      VeteranSchema.findOneAndUpdate(
        { email: req.body.email },
        { $push: { Posts: newPost } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            // console.log(success);
          }
          res.send("successfully inserted in posts");
        });
     
    }
  });
});

router.route('/getfriends').post((req, res, next) => {
  VeteranSchema.find((error, data) => {
    if (error) {
      res.json("not f");
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});


router.route('/getposts').post((req, res, next) => {
  const requestTasks = [];
  var iter = 0;
  var finaliter = 0;
  VeteranSchema.find({ email: req.body.email }, (error, data) => {


    for (var i = 0; i < data[0].followings.length; i++) {

      VeteranSchema.find({ email: data[0].followings[i] }, (error, data2) => {


        for (var j = 0; j < data2[0].Posts.length; j++) {
          requestTasks[iter] = data2[0].Posts[j];

          // console.log(finaliter);
          iter++;
        }
        if (finaliter === data[0].followings.length - 1) {
          // console.log(requestTasks.length);
          res.send(requestTasks);

        }
        finaliter++;

      })



    }

  })
});


router.route('/fetchprofiepic').post((req, res, next) => {

  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    
    res.send(data[0].photo);


  })
});


router.route('/setmyevents').post((req, res, next) => {
  // console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      // console.log(req.body.email);
      var newPost = {
        Eventname: req.body.eventname,
        Eventtime: req.body.time,
      }
      VeteranSchema.findOneAndUpdate(
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
  // console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
   
    res.send(data[0].myEvents);


  })
});


router.route('/getallevents').post((req, res, next) => {
  VeteranSchema.find((error, data) => {
    const requestTasks = [];
    var finaliter=0;
    var iter=0;
    if (error) {
      res.json("not f");
    } else {
      for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].myEvents.length;j++){
            requestTasks[iter]=data[i].myEvents[j];
            iter++;
          }
          if(finaliter===data.length-1){
            res.send(requestTasks)
         
          }
          finaliter++;
      }
     
     
    }
  })
});


router.route('/submitintrestedevents').post((req, res, next) => {
  console.log(req.body);
  // res.send('send');
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      
      
      VeteranSchema.findOneAndUpdate(
        { email: req.body.email },
        { $push: { interested_events: req.body.ename } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
          res.send("successfully inserted in Intrested event");
        });
     
    }
  });
});


router.route('/fetchintrested').post((req, res, next) => {
  console.log(req.body.email);
  // res.send("hello");
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
   
    res.send(data[0].interested_events);


  })
});



router.route('/sethobies').post((req, res, next) => {
  console.log(req.body);
  // res.send('send');
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      
      
      VeteranSchema.findOneAndUpdate(
        { email: req.body.email },
        { $push: { hobbies: req.body.hobies } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
          res.send("successfully inserted in Hobies");
        });
     
    }
  });
});




router.route('/getHobies').post((req, res, next) => {
  console.log(req.body.email);
  // res.send("hello");
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
   
    res.send(data[0].hobbies);


  })
});


router.route('/submitpoints').post((req, res, next) => {
  console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      
      var oldpoints=docs[0].stars+4000;
      
      VeteranSchema.findOneAndUpdate(
        { email: req.body.email },
        { stars: oldpoints },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        });

      res.send("sucesfully updated starts");
    }
  });
});


router.route('/getrank').post((req, res, next) => {
  console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      res.send("not f");
    } else {
      
      var oldpoints=docs[0].stars;

  var rank="";
if(oldpoints>=0 && oldpoints<40000){
  rank="Silver Veteran";
}
else if(oldpoints>=40000 && oldpoints<50000){
  rank="Ruby Veteran";
}
else if(oldpoints>=50000 && oldpoints<60000){
  rank="Golden Veteran";
}
else if(oldpoints>=60000 && oldpoints<65000){
  rank="Diamond Veteran";
}
else if(oldpoints>=65000 && oldpoints<70000){
  rank="Sapphire Veteran";
}
else if(oldpoints>=70000 && oldpoints<100000){
  rank="Platinum Veteran";
}
else if(oldpoints>=100000){
  rank="Eternal Sage";
}

const rankpoints={
  ranking:rank,
  points:oldpoints
}
res.send(rankpoints);
    }
  });
});


// submitpoints
module.exports = router;