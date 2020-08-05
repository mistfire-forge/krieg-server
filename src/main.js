const dotenv = require('dotenv')
dotenv.config()

const fastify = require('fastify')
const fastifyCors = require('fastify-cors')

const server = fastify()
server.register(fastifyCors, {
    origin: '*',
})

const registerSite = require('./site/register.js')

registerSite(server)

server.listen(parseInt(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err)
        throw new Error('Server could not start')
    }

    console.log(`Server listening at ${address}`)
})
