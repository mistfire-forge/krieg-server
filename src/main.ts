import * as dotenv from 'dotenv'
dotenv.config()

import fastify, { FastifyInstance } from 'fastify'
import { registerGameHandler } from './game/game'
import { registerSiteHandlers } from './site/site'

const server: FastifyInstance = fastify({})

registerSiteHandlers(server)
registerGameHandler(server)

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})
