import io from 'socket.io-client'

// I can't get this working on heroku...
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const wsUrl = 'http://' + host + ':' + port
console.log('WS URL FROM socketIO.js plugin: ', wsUrl)

const socket = io(wsUrl)

export default socket
