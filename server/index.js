const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
const app = express()

let rollbar = new Rollbar({
  accessToken: 'ca08aea249b94f0bbd58580542f50f15',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log('Hello world!')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))
