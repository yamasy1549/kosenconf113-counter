const uri = window.location.origin
let redScore = document.getElementById('red-score')
let redTeam = document.getElementById('red-team')
let whiteScore = document.getElementById('white-score')
let whiteTeam = document.getElementById('white-team')

const randomPaw = id => {
  let paw = document.createElement('img')
  paw.setAttribute('class', 'paw')
  let top = Math.floor( Math.random() * (100 + 1 - 0) ) + 0 // 0 ~ 100
  let left = Math.floor( Math.random() * (50 + 1 - 0) ) + 0 // 0 ~ 50
  let deg = Math.floor( Math.random() * (360 + 1 - 0) ) + 0 // 0 ~ 360
  paw.setAttribute('style', 'top: ' + top + 'vh;left:' + left + 'vw;transform: rotate(' + deg + 'deg)')

  if(id == 0)
    paw.setAttribute('src', '../img/paw-red.png')
  if(id == 1)
    paw.setAttribute('src', '../img/paw-white.png')

  return paw
}

const setScores = (id, score) => {
  paw = randomPaw(id)

  if(id == 0) {
    redScore.innerHTML = score
    redTeam.appendChild(paw)
    const newPaw = document.querySelectorAll('.red .paw')[document.querySelectorAll('.red .paw').length-1]
    setTimeout(() => { newPaw.remove() }, 2000)
  }
  if(id == 1) {
    whiteScore.innerHTML = score
    whiteTeam.appendChild(paw)
    const newPaw = document.querySelectorAll('.white .paw')[document.querySelectorAll('.white .paw').length-1]
    setTimeout(() => { newPaw.remove() }, 2000)
  }
}

const socket = io.connect(uri)

socket.emit('INIT', uri, 0)
socket.emit('INIT', uri, 1)

socket.on('TEAM_DATA', team => {
  setScores(team._id, team.score)
})
