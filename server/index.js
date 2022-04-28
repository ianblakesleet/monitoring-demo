const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
const app = express()
app.use(express.json())

const rollbar = new Rollbar({
  accessToken: 'ca08aea249b94f0bbd58580542f50f15',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log('Hello world!')
let students = []

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
  rollbar.info('file served')
})
app.post('/api/student', (req, res) => {
  let { name } = req.body
  name = name.trim()

  students.push(name)

  rollbar.log('Student added successfully', {
    author: 'Ian',
    type: 'manual entry',
  })

  res.status(200).send(students)
})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Take us to warp ${port}!`))
