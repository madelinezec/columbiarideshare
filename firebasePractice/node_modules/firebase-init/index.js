"use strict";

var convar         = require('convar')
  , firebaseConfig = convar('firebase') || {}
  , Firebase       = require('firebase')
  , jsonic         = require('jsonic')



function builder(config, cb) {
  config          = config || {}
  var firebaseRef = new Firebase(config.url)

  function finish(error, fbRef) {
    if (config.path) {
      fbRef = fbRef.child(config.path)
    }
    cb(error, fbRef)
  }

  if (config.token) {
    var token = config.token
    if (config.custom) {
      var FirebaseTokenGenerator = require("firebase-token-generator")
        , tokenGenerator = new FirebaseTokenGenerator(token)
      token = tokenGenerator.createToken(config.custom)
    }
    firebaseRef.authWithCustomToken(token, function(error /*, authData*/) {
      finish(error, firebaseRef)
    })
  } else {
    finish(null, firebaseRef)
  }
}



function FirebaseInit(option, cb) {
  if ('function' == typeof option) {
    cb       = option
    option   = {}
  }
  option     = option      || {}
  if (typeof option === 'string') {
    option = jsonic('' + option)
  }
  var name   = option.name || firebaseConfig.name   || convar('firebase.name') || undefined
  var url    = option.url  || firebaseConfig.url    || convar('firebase.url')  || name && 'https://' + name + '.firebaseio.com' || undefined
  var config = {
    url:    url                                     || convar('firebase.url', 'Firebase name or url config required.'),
    path:   option.path    || firebaseConfig.path   || convar('firebase.path'),
    token:  option.token   || firebaseConfig.token  || convar('firebase.token'),
    custom: option.custom  || firebaseConfig.custom || convar('firebase.custom')
  }

  builder(config, function(err, client) {
    if (cb) {
      cb(err, client)
    } else if (err) {
      throw err
    }
  });
}

module.exports = FirebaseInit
module.exports.ServerValue = Firebase.ServerValue
