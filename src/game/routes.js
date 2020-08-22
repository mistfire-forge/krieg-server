const fastifyWebSocket = require('fastify-websocket')

module.exports = fastify => {
    fastify.register(fastifyWebSocket)

    fastify.get('/game', { websocket: true }, (connection, req) => {
        console.log(`Websocket Connection established on path ${req.url}`)
        const socket = connection.socket

        socket.on('message', message => {
            const parsed = JSON.parse(message)
            if (parsed.eventName !== 'heartbeat') {
                socket.send(
                    JSON.stringify({ eventName: 'test', data: parsed.data })
                )
            }
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