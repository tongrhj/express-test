var express = require('express')
var app = express()
var scores = require('dummyData/scores.json')

// Get Scores
app.get('/', (req, res) => {
  res.json(scores)
})

// Get Score by ID
app.get('/:scoreId', (req, res) => {

})

// Add Score
app.post()

// Update Score
get.put()

// Delete Score
// Use the 'delete' operator. Append only, don't delete from your database
app.delete()
