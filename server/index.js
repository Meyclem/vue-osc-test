const socketIO = require('socket.io');
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const server = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

server.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  server.use(nuxt.render)

  // Listen the server
  const http = require('http').Server(server);
  http.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
  const io = socketIO(http);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('mouse', function(coords){
      console.log('MOUSE COORDS ' + coords);
      io.emit('mouse', coords)
    });

    socket.on('action', function(data){
      console.log('tool used ' + data);
      io.emit('action', data)
    });

    socket.on('dist', function(data){
      console.log('DATA FROM LOCAL UDP SERVER ' + data);
      io.emit('dist', data)
    });
  });
  //
  // setInterval(() => {
  //   data = new Date().toTimeString()
  //   // console.log(data)
  //   io.emit('time', data)
  // }, 1000);
}
start()
