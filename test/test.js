'use strict'
var app = require('../app.js')

var expect = require('chai').expect
var request = require('supertest')


describe('GET /', () => {
  it('responds with list of student json', function (done) {
    request(app)
      .get('/')
      .set('Content-Type', '/json/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
