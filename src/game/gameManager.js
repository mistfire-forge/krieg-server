import User from './user.js'
import { Game } from './game.js'

const activeGames = {}

export const registerConnection = (socket, userData, gameData) => {
    const user = new User(userData)
    // TODO Send User Info Back

    const gameId = gameData.ref.id
    if (!activeGames[gameId]) {
        activeGames[gameId] = new Game(gameData, user, shutDownGame)

        console.log('Activated Game')
    }
    activeGames[gameId].addConnection(socket, user)

    console.log('Added Connection')
}

const shutDownGame = gameId => {
    delete activeGames[gameId]
    console.log('Deleted Game')
}
