const uri = window.location.origin
let redBtn   = document.getElementById('red-btn')
let whiteBtn = document.getElementById('white-btn')

const socket = io.connect(uri)

redBtn.addEventListener('click', () => {
  socket.emit('UPDATE_SCORE', uri, 0)
}, false)

whiteBtn.addEventListener('click', () => {
  socket.emit('UPDATE_SCORE', uri, 1)
}, false)
