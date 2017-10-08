const uri = window.location.origin
let red   = document.getElementById('red-score')
let white = document.getElementById('white-score')

const setScores = (id, score) => {
  if(id == 0)
    red.innerHTML = score
  if(id == 1)
    white.innerHTML = score
}

const socket = io.connect(uri)

socket.emit('INIT', uri, 0)
socket.emit('INIT', uri, 1)

socket.on('TEAM_DATA', team => {
  setScores(team._id, team.score)
})
