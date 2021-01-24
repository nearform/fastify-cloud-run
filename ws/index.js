'use strict'

const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('fastify-websocket'), {
  // echo server
  handle: conn => conn.pipe(conn),
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
