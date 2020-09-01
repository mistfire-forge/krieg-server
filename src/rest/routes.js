import CreateAccountRoute from './createAccount.js'
import LoginRoute from './login.js'
import RefreshRoute from './refresh.js'
import CreateGame from './createNewGame.js'

export default app => {
    CreateAccountRoute(app)
    LoginRoute(app)
    RefreshRoute(app)
    CreateGame(app)
}
