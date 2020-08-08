require('dotenv').config()

const fastify = require('fastify')
const server = fastify()

server.register(require('fastify-cors'), {
    origin: '*',
})
server.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
})
server.register(require('fastify-cookie'), {
    secret: process.env.COOKIE_SECRET,
})

const registerSite = require('./site/routes.js')

registerSite(server)

server.listen(parseInt(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err)
        throw new Error('Server could not start')
    }

    console.log(`Server listening at ${address}`)
})
