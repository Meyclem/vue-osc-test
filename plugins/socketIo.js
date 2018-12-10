import io from 'socket.io-client'

// I can't get this working on heroku...
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const wsUrl = 'http://' + host + ':' + port
console.log('WS URL FROM socketIO.js plugin: ', 'https://nuxt-websocket.herokuapp.com/')
console.log(wsUrl)

const socket = io.connect('https://nuxt-websocket.herokuapp.com/')

export default socket
