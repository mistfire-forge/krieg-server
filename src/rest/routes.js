import CreateAccountRoute from './account/createAccount.js'
import LoginRoute from './account/login.js'
import RefreshRoute from './account/refresh.js'

import CreateSessionRoute from './session/createSession.js'
import MySessionsListRoute from './session/mySessionsList.js'

import CreateMapRoute from './map/createMap.js'
import MyMapsListRoute from './map/myMapsList.js'

import GetMapRoute from './map/getMap.js'

export default app => {
    CreateAccountRoute(app)
    LoginRoute(app)
    RefreshRoute(app)

    CreateSessionRoute(app)
    MySessionsListRoute(app)

    CreateMapRoute(app)
    MyMapsListRoute(app)

    GetMapRoute(app)
}
