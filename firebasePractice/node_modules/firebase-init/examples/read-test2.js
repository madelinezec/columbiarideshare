// examples/read-test.js
// Read test
'use strict';

var FirebaseInit = require('../index')
  , config       = 'name:pub,path:AWS/zone/ap-northeast-1/city' // jsonic


FirebaseInit(config, function (err, firebaseRef) {
  firebaseRef.once('value', function(dataSnapshot) {
    console.log(dataSnapshot.val()) // Tokyo
    process.exit(0)
  }, function(err) {
    console.log(err)
    process.exit(0)
  })
})
