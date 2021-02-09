const fastify = require('fastify')({
  logger: true,
})
const path = require('path')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public')
})

fastify.register(require('fastify-websocket'))

fastify.get('/ws', {
  websocket: true
}, (connection, req) => {
  connection.socket.on('message', message => {
    fastify.websocketServer.clients.forEach((client) => {
      if (client.readyState === 1 && client !== connection.socket) {
        client.send(message)
      }
    })
  })
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
