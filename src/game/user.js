import Connection from './connection.js'

export default class User {
    constructor(ws) {
        this.connections = []
        this.addConnection(ws)
    }

    addConnection(ws) {
        console.log('Adding Connection')
        const newCon = new Connection(ws, () => {
            this.connections.splice(this.connections.indexOf(newCon), 1)
        })
        this.connections.push(newCon)
    }
}
