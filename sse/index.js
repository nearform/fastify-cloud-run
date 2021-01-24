'use strict'

const fastify = require('fastify')({
  http2: true,
  logger: true,
})

fastify.get('/', function (request, reply) {
  const interval = setInterval(function () {
    reply.raw.write(new Date().toISOString())
    reply.raw.write('\n')
  }, 1000)

  request.raw.on('close', () => {
    clearInterval(interval)
    reply.raw.end()
  })
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
