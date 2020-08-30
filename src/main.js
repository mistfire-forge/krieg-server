require('dotenv').config()

const { NetworkErrorCode } = require('../shared/MessageCodes.js')

const fastify = require('fastify')
const server = fastify()

server.register(require('fastify-cors'), {
    origin: ['http://127.0.0.1:1234', '/krieg.mistfireforge.com'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    sameSite: 'lax',
})

server.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
})
server.register(require('fastify-cookie'), {
    secret: process.env.COOKIE_SECRET,
})

server.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send({
            success: false,
            error: {
                code: NetworkErrorCode.CouldNotVerifyToken,
            },
        })
    }
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
