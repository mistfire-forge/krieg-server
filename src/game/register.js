import fastifyWebSocket from 'fastify-websocket'

module.exports = fastify => {
    fastify.register(fastifyWebSocket)

    fastify.get('/game', { websocket: true }, (connection, req) => {
        console.log('Websocket Connection established')
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
