var express = require('express');
var router = express.Router();
var User = require('../models/Login');

/* GET home page. */

//POST route for reading data
router.post('/', function(req, res, next) {
  // cofirm username confired same password twice
  if(req.body.password !== req.body.confirmPassword){
    var err = new Error('Password do not match');
    err.status =  400;
    res.send('password do not match');
    return next(err);
  }

  if(req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confirmPassword) {

      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }

      User.create(userData, function(error, user) {
        if(error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/employees')
        }
      });
    } else if(req.body.logEmail && req.body.logPassword) {
      User.authenticate(req.body.logEmail, req.body.logPassword, function(error, user) {
        if(error || !user) {
          var err = new Error("Wrong username or password");
          err.status = 401;
          return next(err);
        } else {
          req.session.userId =  user._id;
          return redirect('/employees');
        }
      });
    } else {
      var err = new Error("All fields are required");
      err.status = 400;
      return next(err);
    }
})

//GET route after registering
// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router;