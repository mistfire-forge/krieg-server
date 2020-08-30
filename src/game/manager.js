const fastifyWebSocket = require('fastify-websocket')
const url = require('url')
const q = require('querystring')

const GameManager = fastify => {
    fastify.register(fastifyWebSocket, {
        options: {
            verifyClient: info => {
                console.log(info.req.query)

                return true
            },
            server: fastify.server,
        },
    })

    fastify.get(
        '/game/:gameId',
        {
            websocket: true,
        },
        manager
    )
}

const manager = async (connection, req, params) => {
    console.log(
        `Websocket Connection established on path ${
            req.url
        } with params ${Object.keys(params)}`
    )
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
}

const validate = (info, next) => {
    info.req.authenticate()
    next(true)
}

module.exports = GameManager
