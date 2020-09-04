import { GameSetupCode } from '../../shared/MessageCodes.js'

export default class Connection {
    constructor(ws, user, notifyDestroyed, handleMessage) {
        this.processMessage = this.processMessage.bind(this)
        this.setupHeartbeat = this.setupHeartbeat.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.destroy = this.destroy.bind(this)

        this.socket = ws
        this.user = user
        this.notifyDestroyed = notifyDestroyed
        this.handleMessage = handleMessage

        ws.onmessage = this.processMessage
        this.setupHeartbeat()
        ws.onclose = this.destroy

        // DEBUG
        this.sendMessage(GameSetupCode.HandshakeComplete)
    }

    processMessage(event) {
        const message = JSON.parse(event.data)
        if (message.eventName === GameSetupCode.Heartbeat) {
            // Client Side heartbeat
            this.sendMessage(GameSetupCode.Heartbeat)
        } else {
            this.handleMessage(message)
        }
    }
    setupHeartbeat() {
        // Server Side Heartbeat
        this.missedHeartbeat = 0
        this.heartbeatInterval = setInterval(() => {
            if (this.missedHeartbeat > 4) {
                this.destroy()
                return
            }
            ++this.missedHeartbeat
            this.socket.ping()
        }, 5000)
        this.socket.on('pong', () => {
            this.missedHeartbeat = 0
        })
    }

    sendMessage(eventName, message = null) {
        this.socket.send(JSON.stringify({ eventName, data: message }))
    }

    destroy() {
        clearInterval(this.heartbeatInterval)
        this.socket.close()
        this.notifyDestroyed && this.notifyDestroyed(this)
    }
}
