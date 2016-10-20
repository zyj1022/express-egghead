'use strict'

// 需要导入数据
// mongoimport --db test --collection users --drop --file user_list.json

var uri = 'mongodb://localhost:27017/test'

// pretty verbose and simplest use cases to pull out a list of objects, better us ORM mongoose (mongofb+node)

/*
var MongoClient = require('mongodb').MongoClient

var findUsers = function(db, cb) {
    var cursor = db.collection('users').find()
    cursor.each(function(err, doc) {
        if (doc) {
            console.dir(doc)
        } else {
            cb()
        }
    })
}

MongoClient.connect(uri, function(err, db) {
    if (err) throw err
    findUsers(db, function() {
        db.close()
    })
})
*/



var mongoose = require('mongoose')
var _ = require('lodash')

mongoose.connect(uri)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(cb) {
    console.log('db connected')
})

var userSchema = mongoose.Schema({
    username: String,
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
        // full: String  //delete property for virtual properties example
    },
    location: {
        street: String,
        city: String,
        state: String,
        zip: Number
    }
})

userSchema.virtual('name.full').get(function() {
    return _.startCase(this.name.first + ' ' + this.name.last)
})

userSchema.virtual('name.full').set(function(value) {
    var bits = value.split(' ')

    this.name.first = bits[0]
    this.name.last = bits[1]
})

// mongoose will use this name, lowecase it and make it plural to find the collection
exports.User = mongoose.model('User', userSchema)

//  test it works
// exports.User.find({}, function(err, users) {
//     console.log(users)
// })
