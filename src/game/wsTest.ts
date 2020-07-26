import * as WebSocket from 'ws'
import {Data} from 'ws'

const wss = new WebSocket.Server({port: 7000})

wss.on('connection', (ws: WebSocket): void => {
    console.log('Connected!')
    console.log(ws.protocol)
})

wss.on('close', (): void => {
    console.log('Disconnected')
})

