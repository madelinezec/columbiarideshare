// Test: examples/read-test.js
// Read test example text
'use strict';

var should = require('should')
var exec   = require('child_process').exec

describe('example', function() {
  this.timeout(10000)
  it('Read test 2', function(done) {
  exec('node examples/read-test2.js', function (error, stdout, stderr) {
    if (error) throw error
      stdout.slice(0,-1).should.equal("Tokyo")
      stderr.should.equal('')
      done()
    })
  })
})
