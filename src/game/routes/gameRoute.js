import url from 'url'
import ws from 'ws'
const wss = new ws.Server({ noServer: true })

import { client, q } from '../../DBConnector.js'
import { registerConnection } from '../gameManager.js'
import { tokenCache } from './tokenServices.js'
import { WSCode } from '../../../shared/MessageCodes.js'

export const handleGame = async (request, socket, head) => {
    const incomingUrl = new url.URL(request.url, 'http://something')
    const sessionToken = incomingUrl.searchParams.get('token')

    if (!sessionToken || sessionToken === 'null') {
        // Bad session
        console.error('Bad Session Token')
        return socket.destroy()
    }

    if (!tokenCache.has(sessionToken)) {
        return reject(WSCode.NoSuchToken, sessionToken, socket)
    }

    const sessionData = tokenCache.get(sessionToken)

    console.log(sessionData)

    // TODO get user
    let userData
    try {
        userData = await client.query(
            q.Get(q.Ref(q.Collection('users'), sessionData.userId))
        )

        if (!userData) {
            return reject(WSCode.GenericError, sessionToken, socket)
        }
    } catch (err) {
        console.error('Bad User Get from DB') // TODO!!!
        return reject(WSCode.GenericError, sessionToken, socket)
    }

    let gameData
    try {
        const gameId = sessionData.gameId
        gameData = await client.query(
            q.Get(q.Ref(q.Collection('games'), gameId))
        )

        console.log(gameData)

        if (!gameData) {
            return reject(WSCode.GenericError, sessionToken, socket)
        }

        if (gameData.data.complete) {
            return reject(WSCode.GameComplete, sessionToken, socket)
        }
    } catch (err) {
        console.error('Bad Game Data from DB')
        return reject(WSCode.GenericError, sessionToken, socket)
    }

    wss.handleUpgrade(request, socket, head, ws => {
        registerConnection(ws, userData, gameData)
    })
}

const reject = (error, token, socket) => {
    tokenCache.set(token, {
        error: error,
    })
    return socket.destroy()
}
