import User from './user.js'
import { Session } from './session.js'

const activeSessions = {}

export const registerConnection = (socket, userData, sessionData) => {
    const user = new User(userData)
    // TODO Send User Info Back

    const sessionId = sessionData.ref.id
    if (!activeSessions[sessionId]) {
        activeSessions[sessionId] = new Session(sessionData, user, shutDownGame)

        console.log('Activated Game')
    }
    activeSessions[sessionId].addConnection(socket, user)

    console.log('Added Connection')
}

const shutDownGame = gameId => {
    delete activeSessions[gameId]
    console.log('Deleted Game')
}
