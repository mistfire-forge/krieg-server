import User from '../src/game/user.js'

const user = new User('yo')
console.log(user.connections)

setTimeout(() => {
    console.log(user.connections)
}, 2000)
