export default class User {
    constructor(data) {
        this.getClientData = this.getClientData.bind(this)

        this.userId = data.ref.id
    }

    getClientData() {
        return {
            userId: this.userId,
        }
    }
}
