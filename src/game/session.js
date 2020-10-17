import Connection from './connection.js'

export class Session {
    constructor(sessionData, shutDownGame) {
        this.handleUserMessage = this.handleUserMessage.bind(this)
        this.connectionSevered = this.connectionSevered.bind(this)
        this.addConnection = this.addConnection.bind(this)

        this.shutDownGame = shutDownGame

        this.sessionId = sessionData.ref.id

        this.connections = []
    }

    addConnection(socket, user) {
        this.connections.push(
            new Connection(
                socket,
                user,
                this.connectionSevered,
                this.handleUserMessage
            )
        )
    }

    handleUserMessage(message) {}
    connectionSevered(conn) {
        this.connections.splice(this.connections.indexOf(conn), 1)
        console.log('Deleted Connection')

        if (this.connections.length < 1) {
            this.shutDownGame(this.sessionId)
        }
    }
}
