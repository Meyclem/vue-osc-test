import io from 'socket.io-client'

const isDev = process.env.NODE_ENV === 'development'
let wsUrl
if (isDev) {
  wsUrl = 'http://localhost:3000'
} else {
  wsUrl = 'https://nuxt-websocket.herokuapp.com/'
}

console.log(wsUrl)
const socket = io.connect(wsUrl)

export default socket
