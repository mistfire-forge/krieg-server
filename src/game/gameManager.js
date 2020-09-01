import User from './user.js'

const users = {}

export const registerConnection = (socket, playerId) => {
    if (users[playerId] !== undefined) {
    } else {
        users[playerId] = new User(socket)
    }

    socket.on('message', message => {
        const parsed = JSON.parse(message)
        if (parsed.eventName === '--heartbeat--') {
            socket.send(JSON.stringify({ eventName: '--heartbeat--' }))
        } else {
            socket.send(
                JSON.stringify({ eventName: 'test', data: parsed.data })
            )
        }
    })

    setInterval(() => {
        socket.ping()
    }, 2000)
}
