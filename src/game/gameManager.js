import User from './user.js'

const users = {}

export const registerConnection = (socket, playerId) => {
    if (users[playerId] !== undefined) {
        users[playerId].addConnection(socket)
    } else {
        users[playerId] = new User(socket)
    }
}
