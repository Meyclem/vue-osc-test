import io from 'socket.io-client'

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const socket = io('http://' + host + ':' + port)

export default socket
