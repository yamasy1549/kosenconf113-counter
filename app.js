const express        = require('express')
const app            = express()
const server         = require('http').Server(app)
const io             = require('socket.io')(server)
const methodOverride = require('method-override')
const bodyParser     = require('body-parser')
const axios          = require('axios')

// setup
const Team = require('./dbSetup').Team

// server listen
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('listening on', port)
})

// routing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride((req, res) => {
  let method
  if((req.body != null) && typeof req.body === 'object' && '_method' in req.body) {
    method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/scores', (req, res) => {
  res.sendFile(__dirname + '/scores.html')
})

app.get('/api/teams/:team_id', (req, res) => {
  Team.findById(req.params.team_id, (err, team) => {
    if(err) res.send(err)
    res.json(team)
  })
})

app.put('/api/teams/:team_id', (req, res) => {
  Team.findById(req.params.team_id, (err, team) => {
    if(err) res.send(err)
    team.score = team.score + 1
    team.save(err => {
      if(err) res.send(err)
      res.json(team)
    })
  })
})

// socket
io.on('connection', socket => {
  socket.on('INIT', (uri, id) => {
    axios.get(uri + '/api/teams/' + id)
      .then(res => {
        socket.emit('TEAM_DATA', res.data)
      })
  })

  socket.on('UPDATE_SCORE', (uri, id) => {
    axios.put(uri + '/api/teams/' + id)
      .then(res => {
        socket.broadcast.emit('TEAM_DATA', res.data)
      })
  })
})
