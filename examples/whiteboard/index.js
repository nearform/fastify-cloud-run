const fastify = require('fastify')({
    logger: true,
})
const path = require('path')

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
})

fastify.listen(process.env.PORT || 8080)
