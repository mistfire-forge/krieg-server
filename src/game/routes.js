import url from 'url'
import ws from 'ws'
const wss = new ws.Server({ noServer: true })

import { registerConnection } from './gameManager.js'

export default (app, server) => {
    server.on('upgrade', (request, socket, head) => {
        if (request.url.startsWith('/game')) {
            const sessionToken = new url.URL(
                request.url,
                'http://something'
            ).searchParams.get('sessionToken')

            if (!sessionToken || sessionToken === 'null') {
                // Bad session
                socket.destroy()
                return
            }

            wss.handleUpgrade(request, socket, head, ws => {
                registerConnection(ws, null)
            })
        }
    })
}
