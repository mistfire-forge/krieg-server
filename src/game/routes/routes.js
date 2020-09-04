import { handleGame } from './gameRoute.js'
// TODO Implement Token Server for Auth and Error Handling

import { registerServices } from './tokenServices.js'

export default (app, server) => {
    registerServices(app)
    server.on('upgrade', (request, socket, head) => {
        if (request.url.startsWith('/game')) {
            handleGame(request, socket, head)
        }
    })
}
