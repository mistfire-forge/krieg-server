import { FastifyInstance } from 'fastify'
// import fastifyWebSocket from 'fastify-websocket'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastifyWebSocket = require('fastify-websocket')

export const registerGameHandler = (fastify: FastifyInstance): void => {
    fastify.register(fastifyWebSocket)

    fastify.get('/game', { websocket: true }, (connection, req) => {
        const socket = connection.socket

        socket.on('message', message => {
            console.log(message)
            socket.send('Hi from server!')
        })

        socket.on('close', () => {
            console.log('Connection Closed')
        })

        socket.on('end', () => {
            console.log('Connection ended')
        })

        socket.on('error', () => {
            console.log('Error')
        })
    })
}
