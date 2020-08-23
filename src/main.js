require('dotenv').config()

const fastify = require('fastify')
const server = fastify()

if (process.env.INSTANCE_NAME === 'Local') {
    server.register(require('fastify-cors'), {
        origin: ['http://127.0.0.1:1234', '/krieg.mistfireforge.com'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    })
}
server.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
})
server.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})
server.register(require('fastify-cookie'), {
    secret: process.env.COOKIE_SECRET,
})

const registerSite = require('./site/routes.js')
const registerGame = require('./game/routes.js')

registerSite(server)
registerGame(server)

server.listen(parseInt(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err)
        throw new Error('Server could not start')
    }

    console.log(`Server listening at ${address}`)
})
