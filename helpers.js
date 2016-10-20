var fs = require('fs')
var path = require('path')
var _ = require('lodash')

function getUserFilePath(username) {
    return path.join(__dirname, 'users', username) + '.json'
}

function getUser(username) {
    // readFileSync blocks the server execution. It holds everything else. Not a good idea
    var user = JSON.parse(fs.readFileSync(getUserFilePath(username), {
        encoding: 'utf8'
    }))

    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    _.keys(user.location).forEach(function(key) {
        user.location[key] = _.startCase(user.location[key])
    })
    return user
}

function saveUser(username, data) {
    var fp = getUserFilePath(username)

    fs.unlinkSync(fp) // delete the file
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), {
        encoding: 'utf8'
    })
}

function deleteUser(username) {
    var fp = getUserFilePath(username)

    fs.unlinkSync(fp) // delete the file
}

function verifyUser(req, res, next) {
    var username = req.params.username
    var fp = getUserFilePath(username)

    fs.stat(fp, function(err, ok) {
        if (err) throw err
        if (ok) {
            next()
        } else {
            // bailout and skip following route handlers and pass to the next router
            // next('route') // it kinda random, instead use res.redirect
            res.redirect(`/error/${username}`)
        }
    })
}

exports.getUser = getUser
exports.saveUser = saveUser
exports.deleteUser = deleteUser
exports.verifyUser = verifyUser
