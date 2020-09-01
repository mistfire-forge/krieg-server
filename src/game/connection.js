export default class Connection {
    constructor(ws, onDestroy) {
        this.socket = ws
        this.onDestroy = onDestroy

        this.setupHeartbeat()
    }

    setupHeartbeat() {
        // region Server Side Heartbeat
        this.missedHeartbeat = 0
        this.heartbeatInterval = setInterval(() => {
            if (this.missedHeartbeat > 4) {
                clearInterval(this.heartbeatInterval)
                this.onDestroy()
                return
            }
            ++this.missedHeartbeat
            this.socket.ping()
        }, 5000)
        // endregion

        // Client Side heartbeat
        this.socket.on('message', message => {
            const parsed = JSON.parse(message)
            if (parsed.eventName === '--heartbeat--') {
                this.socket.send(JSON.stringify({ eventName: '--heartbeat--' }))
            } else {
                this.socket.send(
                    JSON.stringify({ eventName: 'test', data: parsed.data })
                )
            }
        })
    }
}
