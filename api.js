'use strict'

// 'let' because we want to edit the scoreboard
let scoreboard = require('./dummyData/scores.json')

const scoreFile = './dummyData/scores.json'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

const fetch = require('node-fetch')

const fs = require('fs')

// sorter
app.get('/', function (req, respond) {
  fetch('https://raw.githubusercontent.com/jsstrn/ga-wdi-class/gh-pages/js/data.json')
    // should respond with JSON data
    .then(res => {
      // if (res.ok && res.headers.get("content-type") === "application/json")  { return res.json() }
      if (res.ok && res.headers.get('content-type') === 'text/plain; charset=utf-8') {
        return res.json()
      } else {
        throw new Error('ERROR')
      }
    })
    // Returns a list comprising only student names
    // .then(res => {
    //   var listOfStudentNames = res.students.map((student) => student.name)
    //   return listOfStudentNames
    // })
    .then(res => {
      respond.send(res)
    })
})

app.get('/students', function (req, respond) {
  fetch('https://raw.githubusercontent.com/jsstrn/ga-wdi-class/gh-pages/js/data.json')
    // should respond with JSON data
    .then(res => {
      // if (res.ok && res.headers.get("content-type") === "application/json")  { return res.json() }
      if (res.ok && res.headers.get('content-type') === 'text/plain; charset=utf-8') {
        return res.json()
      } else {
        throw new Error('ERROR')
      }
    })
    .then(res => {
      var listOfStudents = res.students
      return listOfStudents
    })
    // Search for Name
    .then(res => {
      if (req.query.name) {
        var searchResult = res.filter((student) => { return student.name === req.query.name })
        return searchResult
      } else {
        return res
      }
    })
    // Search by Type
    .then(res => {
      if (req.query.type) {
        var searchResult = res.map((student) => student[req.query.type])
        return searchResult
      } else {
        return res
      }
    })
    // Sort alphabetically
    .then(res => {
      var sortedList
      if (req.query.sort === 'desc') {
        sortedList = res.sort((a, b) => a.name.localeCompare(b.name))
        return sortedList
      } else if (req.query.sort) {
        sortedList = res.sort((a, b) => a.name.localeCompare(b.name) * -1)
        return sortedList
      } else {
        return res
      }
    })
    .then(res => {
      respond.send(res)
    })
})

    }
  })
// scoreboard
app.get('/scores', (req, res) => {
  res.json(scoreboard)
})

app.get('/scores/:id', (req, res) => {
})

// create
app.post('/scores', (req, res) => {
  const score = req.body
  console.log(score)
  scoreboard.push(score)
  res.json(score)

  fs.writeFile(scoreFile,JSON.stringify(scoreboard), printError)
})

// update
app.put('/scores/:id', (req, res) => {
  scoreboard[req.params.id] = req.body
  res.json(scoreboard[req.params.id])

  fs.writeFile(scoreFile,JSON.stringify(scoreboard), printError)
})

// delete
app.delete('/scores/:id', (req, res) => {
  delete scoreboard[req.params.id]
  res.send(scoreboard)

  fs.writeFile(scoreFile,JSON.stringify(scoreboard), printError)
})

module.exports = app

function printError (err) {
   if (err) {
       return console.error(err)
   }
   console.log("Data written successfully!")
   fs.readFile(scoreFile, function (err, data) {
      if (err) {
         return console.error(err)
      }
      console.log("Asynchronous read: " + data.toString())
   })
 }
