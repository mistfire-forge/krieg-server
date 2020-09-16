import url from 'url'
import ws from 'ws'
const wss = new ws.Server({ noServer: true })

import { client, q } from '../../DBConnector.js'
import { registerConnection } from '../sessionManager.js'
import { tokenCache } from './tokenServices.js'
import { WSCode } from '../../../shared/MessageCodes.js'

export const handleGame = async (request, socket, head) => {
    const incomingUrl = new url.URL(request.url, 'http://something')
    const requestToken = incomingUrl.searchParams.get('token')

    if (!requestToken || requestToken === 'null') {
        // Bad session
        console.error('Bad Session Token')
        return socket.destroy()
    }

    if (!tokenCache.has(requestToken)) {
        return reject(WSCode.NoSuchToken, requestToken, socket)
    }

    const sessionCache = tokenCache.get(requestToken)

    // TODO get user
    let userData
    try {
        userData = await client.query(
            q.Get(q.Ref(q.Collection('users'), sessionCache.userId))
        )

        if (!userData) {
            return reject(WSCode.GenericError, requestToken, socket)
        }
    } catch (err) {
        console.error('Bad User Get from DB') // TODO!!!
        return reject(WSCode.GenericError, requestToken, socket)
    }

    let sessionData
    try {
        const sessionId = sessionCache.sessionId
        sessionData = await client.query(
            q.Get(q.Ref(q.Collection('sessions'), sessionId))
        )

        if (!sessionData) {
            return reject(WSCode.GenericError, requestToken, socket)
        }

        if (sessionData.data.complete) {
            return reject(WSCode.GameComplete, requestToken, socket)
        }
    } catch (err) {
        console.error('Bad Game Data from DB')
        return reject(WSCode.GenericError, requestToken, socket)
    }

    wss.handleUpgrade(request, socket, head, ws => {
        registerConnection(ws, userData, sessionData)
    })
}

const reject = (error, token, socket) => {
    tokenCache.set(token, {
        error: error,
    })
    return socket.destroy()
}
