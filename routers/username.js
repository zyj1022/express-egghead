var express = require('express')
var helpers = require('../helpers')
var fs = require('fs')

var User = require('../db').User

var router = express.Router({
    mergeParams: true,
});

router.all('/', function(req, res, next) {
    console.log(req.method, 'for', req.params.username)
    next()
});

router.get('/', helpers.verifyUser, function(req, res) {
    var username = req.params.username
    User.findOne({username: username}, function (err, user) {
	  res.render('user', {
		user: user,
		address: user.location
	  })
	})
    // var user = helpers.getUser(username)
    // res.render('user', {
    //     user: user,
    //     address: user.location,
    // })
        // res.send(username);
})

router.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('something broke')
    next()
})

// router.get('/edit', function(req, res) {
//     res.send('you want to edit ' + req.params.username)
// })

router.put('/', function(req, res) {
    var username = req.params.username
	User.findOne({username: username}, function (err, user) {
       if (err) console.error(err)

	   user.name.full = req.body.name
	   user.location = req.body.location
	   user.save(function(){
		   res.send()
	   })
	})
    // var user = helpers.getUser(username)
    // user.location = req.body
    // helpers.saveUser(username, user)
    // res.end()
})

router.delete('/', function(req, res) {
    var fp = helpers.getUserFilePath(req.params.username)
    fs.unlinkSync(fp)
    res.sendStatus(200)
});

module.exports = router
