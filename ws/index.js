'use strict'

const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('fastify-websocket'), {
  handle: (connection, req) => {
    connection.socket.on('message', message => {
      fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1 && client !== connection.socket) {
          client.send(message)
        }
      })
    })
  }
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
