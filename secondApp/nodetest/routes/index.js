var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: '  Our World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

router.post('/adduser', function(req, res){
  var db = req.db;

  // Get our form values. These rely on the "name" attributes

})

/*get the new user page*/
router.get('/newuser', function(req, res){
  res.render('newuser', {title: 'Add new user'});
});

module.exports = router;
