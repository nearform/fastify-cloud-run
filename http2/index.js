'use strict'

const fastify = require('fastify')({
  http2: true,
  logger: true,
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({
    hello: 'world',
    httpVersion: request.raw.httpVersion,
  })
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
