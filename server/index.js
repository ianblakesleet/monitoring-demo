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

  const index = students.findIndex((studentName) => studentName === name)

  if (index === -1 && name !== '') {
    students.push(name)
    rollbar.log('Student added successfully', {
      author: 'Scott',
      type: 'manual entry',
    })
    res.status(200).send(students)
  } else if (name === '') {
    rollbar.error('No name given')
    res.status(400).send('must provide a name.')
  } else {
    rollbar.error('student already exists')
    res.status(400).send('that student already exists')
  }
})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Take us to warp ${port}!`))
