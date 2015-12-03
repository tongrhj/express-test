'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())
mongoose.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@ds061954.mongolab.com:61954/wdi-sg-playground')

const PlayerScore = mongoose.model('Score', {
  name: String,
  score: Number
})

app.get('/', (req, res) => {
  PlayerScore
    .find(function (err, data) {
      if (err) return console.error(err)
      res.json(data)
    })
})

app.get('/scores', (req, res) => {
  PlayerScore
    .find(function (err, data) {
      if (err) return console.error(err)
    })
    .sort({ score: -1 })
    .then(data => {
      res.json(data)
    })
})

app.get('/scores/:name', (req, res) => {
  PlayerScore.find({ name: req.params.name }, (err, data) => {
    if ((err) || !data.length) { res.status(404).end('Score Not Found') }
  })
  .then(data => { res.json(data) })
})

// create
app.post('/scores', (req, res) => {
  const score = new PlayerScore(req.body)
  score.save(err => {
    if (err) res.status(404).end('Score Not Found')
    res.json(score)
  })
})

// update
app.put('/scores/:name/:score', (req, res) => {
  PlayerScore.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, (err, data) => {
    if (err) {
      return console.error(err)
    } else if (data) {
      console.log('Updated', JSON.stringify(data))
      res.json(data)
    } else {
      console.log('Not Found')
      res.status(404).end('Score not found')
    }
  })
})

// delete
app.delete('/scores', (req, res) => {
  PlayerScore.findOneAndRemove({ name: req.body.name }, (err, data) => {
    if (err) return console.error(err)
    res.json(data)
  })
})

module.exports = app
