export default class Connection {
    missedHeartbeat

    constructor(ws, onDestroy) {
        this.socket = ws
        this.onDestroy = onDestroy

        // TODO Setup Heartbeat
        setTimeout(() => {
            this.onDestroy()
        }, 1000)
    }

    setupHeartbeat() {
        this.missedHeatbeat = 0

        this.heartbeatInterval = setInterval(() => {
            if (this.missedHeartbeat > 4) {
                clearInterval(this.heartbeatInterval)
                this.onDestroy()
                return
            }
            ++this.missedHeatbeat
            ws.ping()
        }, 5000)
    }
}
