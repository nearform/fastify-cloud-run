'use strict'

const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('fastify-websocket'), {
  // echo server
  handle: conn => conn.pipe(conn),
})

fastify.get('/', {
  websocket: true
}, (connection /* SocketStream */ , req /* FastifyRequest */ ) => {
  connection.socket.on('message', message => {
    fastify.websocketServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message)
      }
    })
  })
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
