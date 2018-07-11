import io from 'socket.io-client'

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const wsUrl = 'https://nuxt-websocket.herokuapp.com/' + ':' + port
console.log(wsUrl)

const socket = io(wsUrl)

export default socket
