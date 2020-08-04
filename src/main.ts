import * as dotenv from 'dotenv'
dotenv.config()

import fastify, { FastifyInstance } from 'fastify'
import * as fastifyCors from 'fastify-cors'

import { registerGameHandler } from './game/game'
import { registerSiteHandlers } from './site/site'

const server: FastifyInstance = fastify({})
server.register(fastifyCors, {
    origin: '*',
})

registerSiteHandlers(server)
registerGameHandler(server)

server.listen(parseInt(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})
